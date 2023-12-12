const express = require('express');
const router = express.Router();
const ExchangeController = require('../controllers/ExchangeController');

// Define routes for exchange operations
router.post('/create', ExchangeController.createExchange);
router.get('/:exchangeId', ExchangeController.getExchangeById);

// Get exchanges for a specific user and session
router.get('/user/:userId/session/:sessionId', ExchangeController.getExchangesByUserAndSession);


module.exports = router;
