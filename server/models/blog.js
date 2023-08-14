const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  comment_details: {
    type: String,
    required: true,
  },
  delete: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  reports: [
    {
      user_id: { type: Schema.Types.ObjectId, ref: "User" },
      reportDetails: { type: String },
    },
  ],
});

const PostSchema = new Schema(
  {
    image: {
      type: String,
      // required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    approve: {
      type: Boolean,
      default: false,
    },
    delete: {
      type: Boolean,
      default: false,
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post ;
