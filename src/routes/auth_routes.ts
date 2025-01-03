import express from "express";
const router = express.Router();
import authController from "../controllers/auth_controller";
import auth_controller from "../controllers/auth_controller";
const authenticate = auth_controller.authMiddleware

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/refresh", authenticate, authController.refresh);

router.post("/logout", authenticate, authController.logout);

export default router;