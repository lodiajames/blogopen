const dummy = (blogs) =>{
    return 1
}

const totalLikes = (blogPosts) =>{
 let totalLikes = 0;
 for (let post of blogPosts) {
  totalLikes +=post.likes || 0
 }
 return totalLikes;
}


const favoriteBlog = (blogs)=>{
    let maxLikes = 0;
    let favoriteBlogPost= null

    for(let blog of blogs){
        if (blog.likes > maxLikes){
            maxLikes = blog.likes
            favoriteBlogPost = blog
        }
        return favoriteBlog
    }

}

const mostPublishedBlog = (blogs) => {
    const authorCounts = {};

    for (let blog of blogs) {
        if (authorCounts[blog.author]) {
            authorCounts[blog.author]++;
        } else {
            authorCounts[blog.author] = 1;
        }
    }

    let maxBlogs = 0;
    let mostPublishedAuthor = null;

    for (let author in authorCounts) {
        if (authorCounts[author] > maxBlogs) {
            maxBlogs = authorCounts[author];
            mostPublishedAuthor = author;
        }
    }

    return { author: mostPublishedAuthor, blogs: maxBlogs };
};


const mostLikes = (blogs) => {
    const authorLikes = {};


    for (let blog of blogs) {
        if (authorLikes[blog.author]) {
            authorLikes[blog.author] += blog.likes;
        } else {
            authorLikes[blog.author] = blog.likes;
        }
    }

    let maxLikes = 0;
    let mostLikedAuthor = null;


    for (let author in authorLikes) {
        if (authorLikes[author] > maxLikes) {
            maxLikes = authorLikes[author];
            mostLikedAuthor = author;
        }
    }

    return { author: mostLikedAuthor, likes: maxLikes };
};



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostPublishedBlog,
    mostLikes
  

}