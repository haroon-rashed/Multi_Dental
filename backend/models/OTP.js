const mongoose = require("mongoose");
const { Schema } = mongoose;

const otpSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 300, // Document will be automatically deleted after 300 seconds (5 minutes)
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for automatic cleanup
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Otp", otpSchema);
