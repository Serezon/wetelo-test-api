const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const User = require('../user/user.model');
const bcrypt = require('bcrypt');

// sample user, used for authentication
// const user = {
//   username: 'react',
//   password: 'express'
// };

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity
  // if (req.body.username === user.username && req.body.password === user.password) {
  //   const token = jwt.sign({
  //     username: user.username
  //   }, config.jwtSecret);
  //   return res.json({
  //     token,
  //     username: user.username
  //   });
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
        return next(err);
      }

      bcrypt.compare(req.body.password, user[0].password, (error, result) => {
        if (error) {
          const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
          return next(err);
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              permissions: [
                'read'
              ]
            },
            config.jwtSecret,
            { expiresIn: '1d' }
          );

          return res.json({
            token,
            email: user.email
          });
        }
        const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
        return next(err);
      });
    })
    .catch(e => next(e));
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function isValid(req, res) {
  return res.json({
    user: req.user,
    validation: true
  });
}

module.exports = { login, isValid };
