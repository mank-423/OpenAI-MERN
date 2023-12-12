const express = require('express');
const router = express.Router();
const SessionController = require('../controllers/SessionController');


router.post('/create', SessionController.createSession);
router.get('/:sessionId', SessionController.getSessionById);
router.get('/user/:userId', SessionController.getSessionsByUser); // Get sessions of a user


module.exports = router;
