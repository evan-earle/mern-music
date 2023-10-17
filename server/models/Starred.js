import mongoose from "mongoose";
const { Schema } = mongoose;

const starredSchema = new Schema(
  {
    trackId: {
      type: Array,
      default: [],
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
