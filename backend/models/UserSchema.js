const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
