const { v4: uuidv4 } = require('uuid');
const Session = require('../models/SessionSchema');
const User = require('../models/UserSchema');
const Exchange = require('../models/ExchangeSchema');

exports.createSession = async (req, res) => {
  try {
    const { userId, startTime, userMessage, aiMessage } = req.body;

    // Generate a unique session ID using uuid -> npm library
    const sessionId = uuidv4();

    // Create a new exchange
    const newExchange = new Exchange({ userId, sessionId, userMessage, aiMessage });

    // Create a new session
    const newSession = new Session({ sessionId, userId, startTime, exchanges: [newExchange] });
    await newSession.save();

    // Populate the session details
    // await newSession.populate('userId').execPopulate();

    // Update the user by pushing the new session object into the sessions array
    await User.findOneAndUpdate({ userId }, { $push: { sessions: newSession.toObject() } });

    res.status(201).json({ data: { sessionId }, message: 'Session created successfully' });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getSessionById = async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Find session by ID
    const session = await Session.findOne({ sessionId });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.status(200).json({ data: session, message: 'Session retrieved successfully' });
  } catch (error) {
    console.error('Error getting session by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getSessionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find sessions by userId
    const sessions = await Session.find({ userId });

    res.status(200).json({ data: sessions, message: 'Sessions retrieved successfully' });
  } catch (error) {
    console.error('Error getting sessions by user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
