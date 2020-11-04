import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  //   비디오와 코맨트를 연결 하는 방법1
  //   video: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Video"
  //   }
});

const model = mongoose.model("Comment", CommentSchema);
export default model;
