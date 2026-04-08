const mongoose = require("mongoose");

const moodEntrySchema = new mongoose.Schema(
  {
    mood: {
      type: String,
      enum: ["happy", "neutral", "sad", "angry", "tired"],
      required: true
    },
    note: {
      type: String,
      maxlength: 500,
      default: ""
    },
    loggedOn: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

moodEntrySchema.index({ loggedOn: 1 }, { unique: true });
moodEntrySchema.index({ mood: 1 });

module.exports = mongoose.model("MoodEntry", moodEntrySchema);
