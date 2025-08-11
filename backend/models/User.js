const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    // Add these new fields for guest checkout
    isGuestCreated: {
      type: Boolean,
      default: false,
    },
    mustChangePassword: {
      type: Boolean,
      default: function () {
        return this.isGuestCreated;
      },
    },
    lastPasswordChange: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("User", userSchema);
