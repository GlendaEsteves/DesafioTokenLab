const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {type: String, required: true},
  description: String,
  date: {type: Date, required: true},
  start: {type: String, required: true},
  end: {type: String, required: true}
})

module.exports = mongoose.model('Event', eventSchema);