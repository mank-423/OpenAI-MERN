const express = require('express');
const router = express.Router();
const ExchangeController = require('../controllers/ExchangeController');

router.post('/create', ExchangeController.createExchange);
router.get('/:exchangeId', ExchangeController.getExchangeById);
router.get('/user/:userId/session/:sessionId', ExchangeController.getExchangesByUserAndSession);
// Get exchanges user and session


module.exports = router;
