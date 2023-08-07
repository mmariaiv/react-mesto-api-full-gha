const mongoose = require('mongoose');
const { regexLinkValidation } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator: (v) => regexLinkValidation.test(v),
      message: (props) => `${props.value} - данная ссылка некорректна`,
    },
    required: true,
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  likes: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    enum: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
