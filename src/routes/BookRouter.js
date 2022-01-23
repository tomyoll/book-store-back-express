const Router = require('express');
const { body } = require('express-validator');
const { ROLES: { ADMIN }, VALIDATION_MESSAGE } = require('../constants');
const checkRole = require('../middlewares/CheckRoleMiddleWare');

const router = new Router();
const bookController = require('../controllers/BookController');

router.get('/get', bookController.getAll);
router.get('/get-one/:id', bookController.getOne);
router.get('/get-from-wish-list/:id', bookController.getFromWishList);
router.post('/create',
  body('publisher').trim().escape(),
  body('description').trim().escape(),
  body('name', VALIDATION_MESSAGE.BOOK_NAME_LENGTH).isLength({ min: 2, max: 100 }).trim(),
  body('domain', VALIDATION_MESSAGE.DOMAIN_REQUIRED).exists().isMongoId(),
  body('author', VALIDATION_MESSAGE.AUTHOR_REQUIRED).custom((value) => !JSON.parse(value).length <= 0),
  body('year', VALIDATION_MESSAGE.YEAR_REQUIRED).exists().toInt().isLength({ min: 4, max: 4 }),
  body('language', VALIDATION_MESSAGE.LANGUAGE_LENGTH).isLength({ min: 2, max: 60 }).trim(),
  body('pages', VALIDATION_MESSAGE.PAGES_REQUIRED).exists().toInt().isLength({ min: 1 }),
  checkRole(ADMIN), bookController.create);
router.put('/edit/:id',
  body('publisher').trim().escape(),
  body('description').trim().escape(),
  body('name', VALIDATION_MESSAGE.BOOK_NAME_LENGTH).isLength({ min: 2, max: 110 }).trim(),
  body('domain', VALIDATION_MESSAGE.DOMAIN_REQUIRED).exists().isLength({ min: 1 }).isMongoId(),
  body('author', VALIDATION_MESSAGE.AUTHOR_REQUIRED).custom((value) => !JSON.parse(value).length <= 0),
  body('year', VALIDATION_MESSAGE.YEAR_REQUIRED).exists().toInt().isLength({ min: 4, max: 4 }),
  body('language', VALIDATION_MESSAGE.LANGUAGE_LENGTH).isLength({ min: 2, max: 60 }).trim(),
  body('pages', VALIDATION_MESSAGE.PAGES_REQUIRED).exists().toInt().isLength({ min: 1 }),
  checkRole(ADMIN), bookController.edit);
router.delete('/delete/:id', checkRole(ADMIN), bookController.deleteBook);

module.exports = router;
