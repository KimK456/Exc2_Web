import { Router } from 'express';
import * as Comment from '../controllers/comments_controller';

const router: Router = Router();

router.get("/", Comment.getAllComments);

router.get("/:id", Comment.getCommentsSpecificPost);

router.post("/", Comment.createComment);

router.put("/:id", Comment.editCommentById);

router.delete("/:id", Comment.deleteComment);

export default router;