import mongoose from "mongoose";
import userModel from "../models/user_model"

export interface IPosts {
  title: string;
  content: string;
  user: mongoose.Schema.Types.ObjectId;
}

const postSchema = new mongoose.Schema<IPosts>({
  title: {
    type: String,
    required: true,
  },
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModel,
    required: true,
  }
});

const postModel = mongoose.model<IPosts>("Posts", postSchema);

export default postModel;