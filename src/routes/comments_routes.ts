import express from "express";
const router = express.Router();
import commentsController from "../controllers/comments_controller";
import auth_controller from "../controllers/auth_controller";
const authenticate = auth_controller.authMiddleware

router.get("/", authenticate, commentsController.getAll.bind(commentsController));

router.get("/:id", authenticate, commentsController.getById.bind(commentsController));

router.post("/", authenticate, commentsController.create.bind(commentsController))

router.put("/:id", authenticate, commentsController.updateItem.bind(commentsController))

router.delete("/:id", authenticate, commentsController.deleteItem.bind(commentsController))

export default router;