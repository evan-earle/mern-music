import mongoose from "mongoose";
const { Schema } = mongoose;

const starredSchema = new Schema(
  {
    video: {
      type: String,
      required: false,
      active: false,
    },
    artist: {
      type: String,
      required: false,
      active: false,
    },
    song: {
      type: String,
      required: false,
      active: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Starred", starredSchema);
