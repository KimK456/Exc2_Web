import express from "express";
const router = express.Router();
import commentsController from "../controllers/comments_controller";
import auth_controller from "../controllers/auth_controller";
const authenticate = auth_controller.authMiddleware

router.get("/", authenticate, commentsController.getAll.bind(commentsController));

router.get("/:id", authenticate, commentsController.getById.bind(commentsController));

export default router;