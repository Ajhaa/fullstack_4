const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs_list) => {
  let likes = blogs_list.map(b => b.likes)
  const reducer = (c, v) => c + v
  return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs_list) => {
  var mostLikes = 0
  var favorite = null
  blogs_list.forEach((el) => {
    if (el.likes > mostLikes) {
      favorite = el
      mostLikes = el.likes
    }
  })
  if (favorite === null) {
    return null
  }
  const palautettava = {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
  return palautettava
}

const mostBlogs = (blogs_list) => {
  if (blogs_list.length === 0) {
    return null
  }
  const authors = blogs_list
    .map(b => b.author)
  duplicates = {}
  authors.forEach(a => {
    if (a in duplicates) {
      duplicates[a] = duplicates[a] + 1
    } else {
      duplicates[a] = 1
    }
  })
  let author = null
  let most = 0
  authors.forEach(a => {
    if (duplicates[a] > most) {
      author = a
      most = duplicates[a]
    }
  })
  return { author: author, blogs: most }

}

const mostLikes = (blogs_list) => {
  if (blogs_list.length === 0) {
    return null
  }

  const authors = blogs_list
    .map(b => b.author)

  let likes = {}

  blogs_list.forEach(b => {
    if (b.author in likes) {
      likes[b.author] = likes[b.author] + b.likes
    } else {
      likes[b.author] = b.likes
    }
  })

  let author = null
  let most = 0
  authors.forEach(a => {
    if (likes[a] > most) {
      author = a
      most = likes[a]
    }
  })
  return { author: author, likes: most }

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}


