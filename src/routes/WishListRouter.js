const Router = require('express');

const router = new Router();
const wishListController = require('../controllers/WishListController');

router.get('/get/:user', wishListController.get);
router.put('/add/:user', wishListController.add);

module.exports = router;
