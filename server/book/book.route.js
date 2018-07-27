const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');
const config = require('../../config/config');
const paramValidation = require('../../config/param-validation');
const bookCtrl = require('./book.controller');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file,cb) => {
    cb(null, './uploads');
  },
  filename: (req, file,cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
  cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage, 
  limits: {
  fileSize: 1024 * 1024 * 5 //5Mb
  },
  fileFilter: fileFilter
});


const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/books - Get list of books */
  .get(expressJwt({ secret: config.jwtSecret }),bookCtrl.list);

router.route('/create')
  /** POST /api/books/create - Create new book */
  .post(expressJwt({ secret: config.jwtSecret }),
  upload.single('file'),
  validate(paramValidation.createBook), 
  bookCtrl.create);
  
router.route('/:bookId')
  /** GET /api/books/:bookId - Get book */
  .get(expressJwt({ secret: config.jwtSecret }),bookCtrl.get)

  /** PUT /api/books/:bookId - Update book */
  .put(expressJwt({ secret: config.jwtSecret }),
  upload.single('file'),
  validate(paramValidation.updateBook), 
  bookCtrl.update)

  /** DELETE /api/books/:bookId - Delete book */
  .delete(expressJwt({ secret: config.jwtSecret }),bookCtrl.remove);

/** Load book when API with bookId route parameter is hit */
router.param('bookId', bookCtrl.load);

module.exports = router;
