import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    
    imgFile: {
      type: String,
      required: true,
    },
    size:{
      type:Number,
    }
  },
  { timestamps: true }
);

export const Image = mongoose.model("Image", imageSchema);
