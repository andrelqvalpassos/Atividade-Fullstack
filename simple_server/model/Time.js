const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Time = new Schema({
  name: {
    type: String
  },
  year: {
    type: Number
  },
  historia: {
    type: String
  }
}, {
    collection: 'time'
});

module.exports = mongoose.model('Time', Time);