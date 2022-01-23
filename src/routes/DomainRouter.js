const Router = require('express');
const { body } = require('express-validator');
const { ROLES: { ADMIN }, VALIDATION_MESSAGE } = require('../constants');
const checkRole = require('../middlewares/CheckRoleMiddleWare');

const router = new Router();
const domainController = require('../controllers/DomainController');

router.get('/get', domainController.getAll);
router.get('/get-one/:id', domainController.getOne);
router.post('/create',
  body('name', VALIDATION_MESSAGE.DOMAIN_NAME_LENGTH).isLength({ min: 2, max: 60 }).trim(),
  checkRole(ADMIN), domainController.create);
router.put('/edit/:id',
  body('name', VALIDATION_MESSAGE.DOMAIN_NAME_LENGTH).isLength({ min: 2, max: 60 }).trim(),
  checkRole(ADMIN), domainController.edit);
router.delete('/delete/:id', checkRole(ADMIN), domainController.deleteDomain);

module.exports = router;
