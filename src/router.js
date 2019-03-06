const Router = require('koa-router');
const jwt = require('koa-jwt');

const HomeController = require('./controllers/home');
const ProductController = require('./controllers/product');
const AuthController = require('./controllers/auth');
const MailerController = require('./controllers/mailer');
const config = require('./config');

const router = new Router();

// Public routes
router.get('/', HomeController.home);

router.get('/search', ProductController.search);

router.get('/product/list', ProductController.getAll);
router.get('/product/:id', ProductController.getOne);

router.post('/login', AuthController.login);

router.post('/cart', MailerController.sendCartMail);
router.post('/message', MailerController.sendMessageMail);

// Jwt protection
router.use(jwt({ secret: config.secret }));

// Protected routes
router.post('/product', ProductController.create);
router.put('/product/:id', ProductController.update);
router.delete('/product/:id', ProductController.delete);

module.exports = router;
