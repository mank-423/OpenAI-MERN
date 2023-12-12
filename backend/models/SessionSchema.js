const mongoose = require('mongoose');
const { Schema } = mongoose;

const sessionSchema = new Schema({
  sessionId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  exchanges: [{ type: Schema.Types.ObjectId, ref: 'Exchange' }],
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
