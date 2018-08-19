const Joi = require('joi');

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      email: Joi.string().required().regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/),
      password: Joi.string().required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      email: Joi.string().required().regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/),
      password: Joi.string().required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      email: Joi.string().required().regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/),
      password: Joi.string().required()
    }
  },

  //POST /api/books/create
  createBook: {
    body: {
      author: Joi.string().required(),
      title: Joi.string().required(),
      rating: Joi.number().required(),
      status: Joi.boolean().required(),
      description: Joi.string().required(),
      file: Joi.any()
    }
  },

  //PUT /api/books/:bookId
  updateBook: {
    body: {
      author: Joi.string().required(),
      title: Joi.string().required(),
      rating: Joi.number().required(),
      status: Joi.boolean().required(),
      description: Joi.string().required(),
      file: Joi.any()
    },
    params: {
      bookId: Joi.string().hex().required()
    }
  }
};
