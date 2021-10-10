const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})


blogsRouter.post('/', async (request, response) => {
  const body = request.body
  
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if (!request.token || !decodedToken.id) {
  //   return response.status(401).json({ error: 'token missing or invalid' })
  // }
  // const user = await User.findById(decodedToken.id)
  const user = await decodeToken(request)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const saveBlog = await blog.save()
  user.blogs = user.blogs.concat(saveBlog._id)
  await user.save()
  response.json(saveBlog.toJSON())
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    likes: body.likes,
  }

  const updateBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
  res.json(updateBlog.toJSON)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = await decodeToken(request)
  const blog = await Blog.findById(request.params.id)
  console.log('blog', blog.user, ' user ', user._id);
  if(user._id.toString() === blog.user.toString()) {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
  } else {
  response.status(401).end()
} 
})


module.exports = blogsRouter