const router = require('express').Router();
const controller = require('./controllers/');

router.post('/post', controller.create);

module.exports = router;