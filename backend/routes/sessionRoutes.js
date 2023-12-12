const express = require('express');
const router = express.Router();
const SessionController = require('../controllers/SessionController');

// Define routes for session operations
router.post('/create', SessionController.createSession);
router.get('/:sessionId', SessionController.getSessionById);


module.exports = router;
