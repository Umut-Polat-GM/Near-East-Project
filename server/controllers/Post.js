const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError, NotFoundError } = require("../errors");

// Create new post
const createPost = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const post = await Post.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ post });
};

// Get all posts
const getAllPosts = async (req, res) => {
    const posts = await Post.find({ createdBy: req.user.userId }).sort("createdAt");
    res.status(StatusCodes.OK).json({ posts, count: posts.length });
};

// Get post by id
const getPostById = async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id, createdBy: req.user.userId });
    if (!post) {
        throw new NotFoundError(`No post with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ post });
};

// Update post
const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, description, url } = req.body;

    if (title === "" || description === "") {
        throw new BadRequestError("Title and description fields cannot be empty");
    }

    const post = await Post.findOneAndUpdate({ _id: id, createdBy: req.user.userId }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!post) {
        throw new NotFoundError(`No post with id : ${id}`);
    }

    res.status(StatusCodes.OK).json({ post });
};

// Delete post
const deletePost = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findOneAndDelete({ _id: id, createdBy: req.user.userId });
    if (!post) {
        throw new NotFoundError(`No post with id : ${id}`);
    }
    res.status(StatusCodes.OK).send({ message: "Post deleted successfully"});
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
};
