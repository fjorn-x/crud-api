const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    data: Buffer,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
