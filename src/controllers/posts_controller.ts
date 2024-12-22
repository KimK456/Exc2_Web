import { Request, Response } from "express";
import Posts from "../models/posts_model";

const getAllPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const posts = await Posts.find();
        res.send(posts);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getPostById = async (req: Request, res: Response): Promise<void> => {
    const postId: string = req.params.id;
  
    try {
        const post = await Posts.findById(postId);
        if (post != null) {
            res.send(post);
        } else {
            res.status(404).send("Post not found");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const getPostBySenderId = async (req: Request, res: Response): Promise<void> => {
    const senderId: string | undefined = req.query.sender as string | undefined;
    console.log(senderId);
    try {
        if (!senderId) {
            console.log(res.status(400).send("Sender ID is required"));
        }
        const postsOfSender = await Posts.find({ owner: senderId });
        if (postsOfSender.length === 0) {
            console.log(res.status(404).send("No posts found for the specified ID"));
        } else {
            res.status(200).send(postsOfSender);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const createPost = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);
    try {
        const post = await Posts.create(req.body);
        res.status(201).send(post);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

const editPostById = async (req: Request, res: Response): Promise<void> => {
    const postId: string = req.params.id;
    const newPostOwner: string = req.body.owner;
    const newPostTitle: string = req.body.title;
    const newPostContent: string = req.body.content;
    try {
        const updatedPost = await Posts.findByIdAndUpdate(postId, { owner: newPostOwner, title: newPostTitle, content: newPostContent }, { new: true });
        res.status(201).send(updatedPost);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

export {
    getAllPosts,
    getPostById,
    getPostBySenderId,
    createPost,
    editPostById
};