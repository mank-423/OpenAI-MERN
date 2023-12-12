const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/create', UserController.createUser);
router.get('/:userId', UserController.getUserById);


module.exports = router;
