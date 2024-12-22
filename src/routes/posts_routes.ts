import { Router } from 'express';
import * as Post from '../controllers/posts_controller';

const router: Router = Router();

router.get("/", Post.getAllPosts);

router.get("/post/:id", Post.getPostById);

router.get("/post", Post.getPostBySenderId);

router.post("/", Post.createPost);

router.put("/post/:id", Post.editPostById);

export default router;