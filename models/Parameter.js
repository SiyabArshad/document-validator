const mongoose = require('mongoose');

const parameterSchema = new mongoose.Schema({
  fontSize: {
    type: Number,
    default:1
  },
  lineSpacing: {
    type: Number,
    default:1
  },
  fontName: {
    type: String,
    default:""
  },
  fontType: {
    type: String,
    default:"Normal"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Parameter = mongoose.model('Parameters', parameterSchema);

module.exports = Parameter;