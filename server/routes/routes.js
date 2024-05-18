const express = require("express");
const router = express.Router();

const login = require("../controllers/login");
const register = require("../controllers/register");

const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
} = require("../controllers/Post");

const { likePost, unlikePost, getPostLikes } = require("../controllers/Like");

const authMiddleware = require("../middleware/authentication");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/posts").get(authMiddleware, getAllPosts).post(authMiddleware, createPost);
router
    .route("/posts/:id")
    .get(authMiddleware, getPostById)
    .patch(authMiddleware, updatePost)
    .delete(authMiddleware, deletePost);

router.route("/like").post(authMiddleware, likePost);
router.route("/unlike").post(authMiddleware, unlikePost);
router.route("/likes/:postId").get(authMiddleware, getPostLikes);

module.exports = router;
