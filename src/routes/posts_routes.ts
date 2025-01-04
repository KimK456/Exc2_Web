import express from "express";
const router = express.Router();
import postsController from "../controllers/posts_controller";
import auth_controller from "../controllers/auth_controller";
const authenticate = auth_controller.authMiddleware

router.get("/", authenticate, postsController.getAll.bind(postsController));

router.get("/:id", authenticate, postsController.getById.bind(postsController));

router.post("/", authenticate, postsController.create.bind(postsController))

router.put("/:id", authenticate, postsController.updateItem.bind(postsController))

router.delete("/:id", authenticate, postsController.deleteItem.bind(postsController))

export default router;