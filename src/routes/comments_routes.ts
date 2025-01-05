import express from "express";
const router = express.Router();
import commentsController from "../controllers/comments_controller";
import auth_controller from "../controllers/auth_controller";
const authenticate = auth_controller.authMiddleware

/**
* @swagger
* tags:
*   name: Comments
*   description: The Comments API
*/

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         _id:
 *           type: String
 *           description: The auto-generated id of the comment
 *         comment:
 *           type: String
 *           description: The content of the post
 *         postId:
 *              type: String
 *              description: The post ID of which the comment belongs
 *         user: 
 *              type: String
 *              description: The id of the user who posted the comment
 *       example:
 *         _id: 6777e2dfa57d1f1e1ab7b2fa
 *         comment: "This is a very good post"
 *         postId: "6777e0a2bb11ceb4f9ce2591"
 *         user: "6776c5964e379299bf5b1087"
 */

/**
 * @swagger
 * comments:
 *   get:
 *     summary: Get all comments
 *     description: Retrieve a list of all comments
 *     tags:
 *       - Comments
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Server error
 */
router.get("/", commentsController.getAll.bind(commentsController));

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get a comment by post ID
 *     description: Get a comment by post ID
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post
 *     responses:
 *       200:
 *         description: A single post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.get("/:id", commentsController.getByPostId.bind(commentsController));

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     description: Create a new comment
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The title of the comment
 *               postId: 
 *                 type: string
 *                 description: The post for which the comment posted
 *               user:
 *                 type: string
 *                 description: The user of the comment
 *             required:
 *               - comment
 *               - postId
 *               - user
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/", authenticate, commentsController.create.bind(commentsController))

/**
 * @swagger
 * comments/{id}:
 *   put:
 *     summary: Update an existing comment
 *     description: Update an existing comment
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The title of the comment
 *             required:
 *               - title
 *               - content
 *     responses:
 *       201:
 *         description: comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put("/:id", authenticate, commentsController.updateItem.bind(commentsController))

/**
 * @swagger
 * comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     description: Delete a single comment by its ID
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the comment
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", authenticate, commentsController.deleteItem.bind(commentsController))

export default router;