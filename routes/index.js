const Router = require('express').Router;
const authRouter = require('./authRouter');
const organizationRouter = require('./organizationRouter');
const employeeRouter = require('./employeeRouter');
const discountRouter = require('./discountRouter');

const router = new Router();

router.use('/auth', authRouter);
router.use('/org', organizationRouter);
router.use('/employee', employeeRouter);
router.use('/discount', discountRouter);

module.exports = router;