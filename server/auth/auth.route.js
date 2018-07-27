const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');
const paramValidation = require('../../config/param-validation');
const authCtrl = require('./auth.controller');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login')
  .post(validate(paramValidation.login), authCtrl.login);

/** GET /api/auth/token-validator - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
router.route('/token-validator')
  .get(expressJwt({ secret: config.jwtSecret }), authCtrl.isValid);

module.exports = router;
