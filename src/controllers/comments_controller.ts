import { Request, Response } from "express";
import Comments from "../models/comments_model";
import Posts from "../models/posts_model";

const getAllComments = async (req: Request, res: Response): Promise<void> => {
    try {
        const comments = await Comments.find();
        res.send(comments);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const createComment = async (req: Request, res: Response): Promise<void> => {
    const postId: string = req.body.postId;
    try {
        const post = await Posts.findById(postId);
        if (post) {
            const comment = await Comments.create(req.body);
            res.status(201).send(comment);
            console.log("Created Successfully");
        } else {
            console.log(res.status(404).send("Post Not Found"));
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
};

const getCommentsSpecificPost = async (req: Request, res: Response): Promise<void> => {
    const PostId: string = req.params.id;
    try {
        const post = await Posts.findById(PostId);
        if (post) {
            const postsComments = await Comments.find({ postId: PostId });
            if (postsComments.length === 0) {
                console.log(res.status(404).send("No comments found for the specified post"));
            } else {
                res.status(200).send(postsComments);
            }
        } else {
            console.log(res.status(404).send("Post Not Found"));
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
};

const editCommentById = async (req: Request, res: Response): Promise<void> => {
    const commentId: string = req.params.id;
    const newCommentAuthor: string = req.body.author;
    const newCommentContent: string = req.body.content;
    try {
        const UpdatedComment = await Comments.findByIdAndUpdate(commentId, { author: newCommentAuthor, content: newCommentContent }, { new: true });
        res.status(201).send(UpdatedComment);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

const deleteComment = async (req: Request, res: Response): Promise<void> => {
    const commentId: string = req.params.id;
    console.log(commentId);
    try {
        const rs = await Comments.findByIdAndDelete(commentId);
        res.status(200).send(rs);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export {
    getAllComments,
    createComment,
    getCommentsSpecificPost,
    editCommentById,
    deleteComment
};