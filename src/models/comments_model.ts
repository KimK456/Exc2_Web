import mongoose from "mongoose";
import userModel from "../models/user_model"

export interface IComments {
  comment: string;
  user: mongoose.Schema.Types.ObjectId;
  postId: string;
}
const commentsSchema = new mongoose.Schema<IComments>({
  comment: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModel,
    required: true,
  },
});

const commentsModel = mongoose.model<IComments>("Comments", commentsSchema);

export default commentsModel;