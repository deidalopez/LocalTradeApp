const router = require('express').Router();
const controller = require('./controllers/');

router.post('/register', controller.create);

module.exports = router;