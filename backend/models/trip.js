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
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Trip", tripSchema);
