const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers')
const bookController = require('../controllers/bookController')

// The main route
router.get('/', bookController.mainPage)
router.get('/addbook', bookController.addBook)

router.post('/addBook', catchErrors(bookController.saveBook))

router.get('/books/:slug', catchErrors(bookController.getBookBySlug))

router.get('/tags')
// Export our router
module.exports = router;
