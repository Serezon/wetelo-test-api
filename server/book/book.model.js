const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');


/**
 * User Schema
 */
const BookSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 3
  },
  status: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    required: true
  },
  file: {
    type: String,
    default: ''
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
BookSchema.method({
});

/**
 * Statics
 */
BookSchema.statics = {
  get(id) {
    return this.findById(id)
      .exec()
      .then((book) => {
        if (book) {
          return book;
        }
        const err = new APIError('No such book exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  list({ skip = 0, limit = 10, sortBy = 'author', order = 1, search = '' } = {}) {
    let sortQuery = {};
    let findQuery = {};
    if (search.length) findQuery = { $or: [ {author: search }, {title: search} ] };
    sortQuery[sortBy] = order;
    return this.find(findQuery)
      .sort(sortQuery)
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};
/**
 * @typedef Book
 */
module.exports = mongoose.model('Book', BookSchema);
