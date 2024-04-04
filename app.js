require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')



mongoose.connect(config.mongoUrl)
 .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
  })





logger.info('connected to', config.mongoUrl)

app.use(cors())
app.use(express.json())

app.get('/', (request, response)=>{
  response.send('<h1>Hello World!</h1>')
})

app.use('/api/blogs', blogRouter)



module.exports = app