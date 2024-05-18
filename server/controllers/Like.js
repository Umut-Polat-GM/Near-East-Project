const Like = require("../models/Like");
const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError, NotFoundError } = require("../errors");
const asyncHandler = require("express-async-handler");

// Like a post
const likePost = asyncHandler(async (req, res) => {
    const { postId } = req.body;
    const userId = req.user.userId;

    const post = await Post.findById(postId);
    if (!post) {
        throw new NotFoundError(`No post with id : ${postId}`);
    }

    const like = await Like.findOne({ post: postId, user: userId });
    if (like) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "You have already liked this post" });
    }

    await Like.create({ post: postId, user: userId });

    res.status(StatusCodes.CREATED).json({ message: "Post liked successfully" });
});

// Unlike a post
const unlikePost = asyncHandler(async (req, res) => {
    const { postId } = req.body;
    const userId = req.user.userId;

    const post = await Post.findById(postId);
    if (!post) {
        throw new NotFoundError(`No post with id : ${postId}`);
    }

    const like = await Like.findOne({ post: postId, user: userId });
    if (!like) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "You have not liked this post" });
    }

    await Like.findOneAndDelete({ post: postId, user: userId });

    res.status(StatusCodes.OK).json({ message: "Post unliked successfully" });
});

// Get likes count of a post
const getPostLikes = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.userId;

    const post = await Post.findById(postId);
    if (!post) {
        throw new NotFoundError(`No post with id : ${postId}`);
    }

    const likesCount = await Like.countDocuments({ post: postId });

    // Check if user has liked a post
    const hasLiked = await hasUserLikedPost(postId, userId);

    res.status(StatusCodes.OK).json({ likes: likesCount, hasLiked });
});

// Check if user has liked a post
const hasUserLikedPost = async (postId, userId) => {
    const like = await Like.findOne({ post: postId, user: userId });
    return like ? true : false;
};

module.exports = { likePost, unlikePost, getPostLikes };
