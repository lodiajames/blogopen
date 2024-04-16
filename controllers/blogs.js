const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')




blogRouter.get('/', async(request, response)=>{
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')){
        return authorization.replace('Bearer ', '')
    }
    return null
}


blogRouter.post('/', async (request, response)=>{
   const body = request.body

   const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
   
   if(!decodedToken.id){
       return response.status(401).json({error: 'token invalid'})
   }
  const user = await User.findById(decodedToken.id)

 const blog = new Blog({
    title: body.title,
    author: body.author,
    url:  body.url,
    likes: body.number,
    user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
   
    response.status(201).json(savedBlog)
      
})

blogRouter.delete('/:id', async(request, response) =>{
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    
    if(!decodedToken.id) {
        return response.status(401).json({error: 'token invalid'})
    }

    const blog = await Blog.findById(request.params.id)
    if(!blog){

        return response.status(404).json({error: 'blog not found'})
    }
    if(blog.user.toString() !== decodedToken.id){
        return response.status(403).json({error: 'unauthorized access'})
    }
    const user = await User.findById(decodedToken.id)
    user.blogs = user.blogs.filter( b => b.toString() !== blog._id.toString())
    
    await user.save()
    await blog.remove()
    response.status(204).end()
})
module.exports = blogRouter
