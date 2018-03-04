const mongoose = require('mongoose')
const slug = require('slugs')
mongoose.Promise = global.Promise
// const validator = require('validator')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: 'Please enter a title!'
  },
  author: {
    type: String,
    trim: true,
    required: 'Please enter an author!'
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  isbn: {
    type: String,
    trim: true
  },
  tags: [String],
  link: String,
  // user: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'User',
  //   required: 'You must supply a contributor\'s name'
  // }, 
})

bookSchema.pre('save', async function(next) {
  
  if (!this.isModified('title')) {
    next(); // skip it
    return; // stop this function from running
  }
  
  this.slug = slug(this.title)

  //Checking if a book with such slug already exists
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i')
  const booksWithSlugs = await this.constructor.find({ slug: slugRegEx })
  
  if (booksWithSlugs.length) {
    this.slug = `${this.slug}-${booksWithSlugs.length + 1}`
  }

  // const isbnRegEx = new RegExp(`^(?:ISBN(?:-1[03])?:?\ )?(?=[0-9X]{10}$|(?=(?:[0-9]+[-\ ]){3})[-\ 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[-\ ]){4})[-\ 0-9]{17}$)(?:97[89][-\ ]?)?[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9X]$`)
  // const bookswithisbn = await this.constructor.find({ isbn: isbnRegEx })


  next()

})

module.exports = mongoose.model('Book', bookSchema)