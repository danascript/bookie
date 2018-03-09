const mongoose = require('mongoose')
const Book = mongoose.model('Book')


exports.mainPage = (req, res) => {
  res.render('home', {
    title: 'Main',
    description: 'An online library for developers'
  })
}

exports.addBook = (req, res) => {

  res.render('addBook', {
    title: 'Add a book'
  })
}

exports.saveBook = async (req, res) => {
  const book = await (new Book(req.body)).save()
  
  req.flash('success', `Successfully saved ${book.title}.`)
  res.redirect(`./books/${book.slug}`)
}

exports.getBookBySlug = async (req, res, next) => {
  
  const book = await Book.findOne({ slug: req.params.slug })

  if (!book) return next()

  res.render('bookPage', {
    title: `${ book.title }`,
    book
  })
}

exports.booksList = async (req, res) => {
  const books = await Book.find()
  
  res.render('books', {
    title: 'Books',
    books
  })
}

exports.getBooksByTags = async (req, res) => {
  const tag = req.params.tag
  const tagQuery = tag || { $exists: true }

  const tagsPromise = Book.getTagsList()
  const booksPromise = Book.find({ tags: tagQuery })
  
  const [tags, books] = await Promise.all([ tagsPromise, booksPromise ])

  res.render('tags', {
    title: 'Find books by tags',
    books,
    tags,
    tag
  })
}