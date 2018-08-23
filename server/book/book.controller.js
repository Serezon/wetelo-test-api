const Book = require('./book.model');
const fs = require('fs');
const path = require('path');

function load(req, res, next, id) {
  Book.get(id)
    .then((book) => {
      req.book = book; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get book
 * @returns {book}
 */
function get(req, res) {
  return res.json(req.book);
}

/**
 * Create new book
 * @returns {Book}
 */
function create(req, res, next) {
  const book = new Book({
    author: req.body.author,
    title: req.body.title,
    rating: req.body.rating,
    status: req.body.status,
    description: req.body.description,
    file: req.file.path
  });

  book.save()
    .then(savedBook => res.json(savedBook))
    .catch(e => next(e));
}

/**
 * Update existing book
 * @returns {Book}
 */
function update(req, res, next) {
  const book = req.book;
  book.author = req.body.author;
  book.title = req.body.title;
  book.rating = req.body.rating;
  book.status = req.body.status;
  book.description = req.body.description;
  if (req.file && req.file.path) { 
    fs.unlink( path.join(__dirname, '/../../', book.file) );
    book.file = req.file.path;
  }

  book.save()
    .then(savedBook => res.json(savedBook))
    .catch(e => next(e));
}


function list(req, res, next) {
  const { limit = 50, skip = 0, sortBy = 'author', order = 1, search = '' } = req.query;
  Book.list({ limit, skip, sortBy, order, search})
    .then(books => res.json(books))
    .catch(e => next(e));
}

/**
 * Delete book.
 * @returns {Book}
 */
function remove(req, res, next) {
  const book = req.book;
  fs.unlink( path.join(__dirname, '/../../', book.file) );
  book.remove()
    .then(deletedBook => res.json(deletedBook))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
