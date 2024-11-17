const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema(
  {
    lead: {
      type: String,
      required: true,
    },
    emailTemplate: {
      type: String,
      required: true,
    },
    delay: {
      by: { type: String, required: true },
      type: { type: String, enum: ["Hours", "Days"], required: true },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Email", EmailSchema);
