const router = require('express').Router();
const controller = require('./controllers/');
const authorizeUser = require('./middleware/auth');
const { body } = require('express-validator');

//users
router.get('/get', controller.grabAll);

router.post('/register', body('password').isLength({min: 6}), controller.createUser);

router.post('/login', controller.login);

router.get('/getUser', authorizeUser, controller.getUser);

router.get('/getByEmail/:userEmail', controller.getUserByEmail);

router.get('/getById/:userId', controller.getUserById);


// posts
router.post('/newPost', controller.newPost);

router.get('/allPosts', controller.getPosts);

router.get('/postsByUserId', controller.getPostsByUserId);

module.exports = router;
