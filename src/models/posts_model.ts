import mongoose, { Schema, Document } from "mongoose";

interface IPost extends Document {
    title: string;
    content?: string;
    owner: string;
}

const postsSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: String,
    owner: {
        type: String,
        required: true,
    }
});

const Posts = mongoose.model<IPost>("Posts", postsSchema);
export default Posts;