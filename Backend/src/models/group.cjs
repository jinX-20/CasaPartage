const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  bills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bill' }],
});

module.exports = mongoose.model('Group', groupSchema);