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

  req.flash('success', `Successfully created ${book.title}.`)
  res.redirect(`/books/${book.slug}`)
}

exports.getBookBySlug = async (req, res, next) => {
  const book = await Book.findOne({ slug: req.params.slug }).populate('title author isbn link description published tags _id')
  console.log(book)

  if (!book) return next()

  res.render('/books/bookPage', {
    title: `${ book.title }`,
    book
  })
}



// // Return the list of all todo items
// exports.getToDoList = async (request, response) => {
//   const todos = await ToDo.find().sort('_id')
  
//     response.json({
//         todos
//     })
// }

// // Store a new todo item and redirect
// exports.createToDo = async (request, response) => {
//     const todo = await (new ToDo(request.body)).save()

//     response.json({
//         'message': 'Successfully created a new ToDo.',
//         todo
//     })
// }

// // Delete a todo item and redirect
// exports.deleteToDo = async (request, response) => {
//     const todo = await ToDo.findOneAndRemove({ _id: request.params.id })
    
//     response.json({
//         'message': 'Successfully deleted the ToDo.'
//     })
// }