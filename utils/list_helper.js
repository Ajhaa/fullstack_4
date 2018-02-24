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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}


