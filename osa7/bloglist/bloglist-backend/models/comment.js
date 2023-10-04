const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: String,
  date: Date,
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
});

module.exports = mongoose.model("Comment", commentSchema);
