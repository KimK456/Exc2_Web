import mongoose from "mongoose";

export interface IPosts {
  title: string;
  content: string;
  owner: string;
}

const postSchema = new mongoose.Schema<IPosts>({
  title: {
    type: String,
    required: true,
  },
  content: String,
  owner: {
    type: String,
    required: true,
  },
});

const postModel = mongoose.model<IPosts>("Posts", postSchema);

export default postModel;