const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
    {
    userId: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    company:{
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Remote", "Onsite", "Hybrid"],
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    dateApplied: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Applied",
        "Shortlisted",
        "Interview",
        "Offer",
        "Hired",
        "Rejected",
        "No Response",
      ],
      default: "Applied",
    },
    notes: String,
    reminderDate: Date,
    isBookmarked: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    priority: {
      type: Boolean,
      default: false,
    },
    resumeLink: String,
    coverLetterLink: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);