const listHelper = require('../utils/list_helper')

describe('list_helpers', () => {
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
      author: 'Atte',
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
      author: 'Atte',
      url: 'localhost 3001',
      likes: 3,
      _id: '5a91401f7c7b814be09d13f7',
      __v: 0
    },
    {
      title: 'Testiblogi2',
      author: 'Atte',
      url: 'localhost 3001',
      likes: 5,
      _id: '5a91401f7c7b814gh09s13f7',
      __v: 0
    }
  ]

  test('dummy is called', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })

  describe('total likes', () => {
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

  describe('favorite blog', () => {
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

  describe('most blogs', () => {
    test('works with no blogs', () => {
      const most = listHelper.mostBlogs([])
      expect(most).toBe(null)
    })
    test('works with one blog', () => {
      const most = listHelper.mostBlogs(listWithOneBlog)
      expect(most).toEqual({ author: "Edsger W. Dijkstra", blogs: 1 })
    })

    test('works with two blogs', () => {
      const most = listHelper.mostBlogs(listWithTwoBlogs)
      expect(most).toEqual({ author: "Edsger W. Dijkstra", blogs: 1 })
    })
    test('works with person who has two blogs', () => {
      const most = listHelper.mostBlogs(listWithEqualLikes)
      expect(most).toEqual({ author: "Atte", blogs: 2 })
    })
  })

  describe('favorite author', () => {
    test('works with no blogs', () => {
      const most = listHelper.mostLikes([])
      expect(most).toBe(null)
    })

    test('works with one blog', () => {
      const most = listHelper.mostLikes(listWithOneBlog)
      expect(most).toEqual({ author: "Edsger W. Dijkstra", likes: 5 })
    })

    test('works with two blogs', () => {
      const most = listHelper.mostLikes(listWithTwoBlogs)
      expect(most).toEqual({ author: "Edsger W. Dijkstra", likes: 5 })
    })
    test('works with person who has two blogs', () => {
      const most = listHelper.mostLikes(listWithEqualLikes)
      expect(most).toEqual({ author: "Atte", likes: 8 })
    })
  })
})
