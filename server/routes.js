const router = require('express').Router();
const controller = require('./controllers/');
const authorizeUser = require('./auth/auth');
// const {Users, Posts} = require('./models/models');
// const db = require('./db')

router.get('/get', controller.grabAll);

router.post('/register', controller.createUser);

router.post('/login', controller.login);

router.get('/getUser', authorizeUser, controller.getUser);

router.get('/getByEmail/:userEmail', controller.getUserByEmail);

router.get('/getByEmail/:userId', controller.getUserById);


// posts
// router.post('/newPost', controller.newPost);
router.post('/newPost', authorizeUser, controller.newPost);

router.get('/allPosts', controller.getPosts);

router.get('/postsByUserId', controller.getPostsByUserId);

module.exports = router;
