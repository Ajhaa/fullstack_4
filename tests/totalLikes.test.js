const listHelper = require('../utils/list_helper')

describe('total likes', () => {
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



  test('works with one blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('works with two elements in list', () => {
    const result = listHelper.totalLikes(listWithTwoBlogs)
    expect(result).toBe(8)
  })

  test('works with empty list', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })


})
