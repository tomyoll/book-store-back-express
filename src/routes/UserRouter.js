const Router = require('express');

const router = new Router();
const { body } = require('express-validator');
const userController = require('../controllers/UserController');
const { VALIDATION_MESSAGE } = require('../constants/index');

router.post('/registration',
  body('email', 'Не корректный email').exists().isEmail().normalizeEmail(),
  body('password', VALIDATION_MESSAGE.PASSWORD_LENGTH).isLength({
    min: 5,
    max: 12,
  }), userController.registration);
router.post('/login',
  body('email').normalizeEmail(), userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.put('/:id');
module.exports = router;
