import mongoose from "mongoose";

// mongoose.Schema 안에 작성 하는것이 document, 여기선 json
// 자세히 보면 json 형태다.
// 즉 스키마는 document로 작성한다.
const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required",
  },
  title: {
    type: String,
    required: "Tilte is required",
  },
  description: String,
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //   비디오와 코맨트를 연결 하는 방법2
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
// 위에 스키마를 디비에 적용하는것.
const model = mongoose.model("Video", VideoSchema);
export default model;
