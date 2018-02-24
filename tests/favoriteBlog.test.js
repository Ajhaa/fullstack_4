const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithTwoBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      title: 'Testiblogi3',
      autho: 'Atte',
      url: 'localhost 3001',
      likes: 3,
      _id: '5a91401f7c7b814be09d13f7',
      __v: 0
    }
  ]
  const listWithEqualLikes = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      title: 'Testiblogi3',
      autho: 'Atte',
      url: 'localhost 3001',
      likes: 3,
      _id: '5a91401f7c7b814be09d13f7',
      __v: 0
    },
    {
      title: 'Testiblogi2',
      autho: 'Tomppa',
      url: 'localhost 3001',
      likes: 5,
      _id: '5a91401f7c7b814gh09s13f7',
      __v: 0
    }
  ]
  const exp = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 5,
  }

  test('works with one blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(exp)
  })

  test('works with two blogs', () => {
    const result = listHelper.favoriteBlog(listWithTwoBlogs)
    expect(result).toEqual(exp)
  })

  test('works with equal amount of likes on two blogs', () => {
    const result = listHelper.favoriteBlog(listWithEqualLikes)
    expect(result).toEqual(exp)
  })

  test('works with no blogs', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })
})
