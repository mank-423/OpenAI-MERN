const mongoose = require('mongoose');
const { Schema } = mongoose;

const exchangeSchema = new Schema({
  userId: { type: String, required: true },
  sessionId: { type: String, required: true },
  userMessage: { type: String, required: true },
  aiMessage: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Exchange = mongoose.model('Exchange', exchangeSchema);

module.exports = Exchange;
