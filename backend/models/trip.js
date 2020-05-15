const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const tripSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  createdBy: {
    type: ObjectId,
    ref: "User",
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Trip", tripSchema);
