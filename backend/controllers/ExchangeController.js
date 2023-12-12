const Exchange = require('../models/ExchangeSchema');
const Session = require('../models/SessionSchema');

// Controller functions for exchange operations
exports.createExchange = async (req, res) => {
  try {
    const { userId, sessionId, userMessage, aiMessage } = req.body;

    // Create a new exchange
    const newExchange = new Exchange({ userId, sessionId, userMessage, aiMessage });
    await newExchange.save();

    // Find the corresponding session and add the exchange to its exchanges array
    await Session.findOneAndUpdate(
      { sessionId },
      { $push: { exchanges: newExchange._id } },
      { new: true }
    );

    res.status(201).json({ data: { exchangeId: newExchange._id }, message: 'Exchange created successfully' });
  } catch (error) {
    console.error('Error creating exchange:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getExchangeById = async (req, res) => {
  try {
    const { exchangeId } = req.params;

    // Find exchange by ID
    const exchange = await Exchange.findOne({ _id: exchangeId });

    if (!exchange) {
      return res.status(404).json({ error: 'Exchange not found' });
    }

    res.status(200).json({ data: exchange, message: 'Exchange retrieved successfully' });
  } catch (error) {
    console.error('Error getting exchange by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to get exchanges for a specific user and session
exports.getExchangesByUserAndSession = async (req, res) => {
  try {
    const { userId, sessionId } = req.params;

    // Find exchanges by userId and sessionId
    const exchanges = await Exchange.find({ userId, sessionId });

    res.status(200).json({ data: exchanges, message: 'Exchanges retrieved successfully' });
  } catch (error) {
    console.error('Error getting exchanges by user and session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
