const Router = require('express').Router;
const isAuth = require('../middlewares/isAuthMiddleware');
const AuthController = require('../controllers/authController');

const authRouter = new Router();

authRouter.get('/authorize', isAuth, AuthController.authorize);
authRouter.post('/registration', AuthController.registration);
authRouter.post('/login', AuthController.login);

module.exports = authRouter;