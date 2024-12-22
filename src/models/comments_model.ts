import mongoose, { Schema, Document } from "mongoose";

interface IComment extends Document {
    content: string;
    author: string;
    postId: mongoose.Types.ObjectId;
}

const commentSchema: Schema<IComment> = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
});

const Comment = mongoose.model<IComment>("Comment", commentSchema);
export default Comment;