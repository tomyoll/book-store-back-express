const Router = require('express');

const router = new Router();
const bookRouter = require('./BookRouter');
const domainRouter = require('./DomainRouter');
const userRouter = require('./UserRouter');
const wishListRouter = require('./WishListRouter');

router.use('/book', bookRouter);
router.use('/domain', domainRouter);
router.use('/user', userRouter);
router.use('/wish-list', wishListRouter);

module.exports = router;
