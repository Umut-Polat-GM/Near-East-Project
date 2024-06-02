const path = require("path");
const fs = require("fs");
const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError, NotFoundError } = require("../errors");

// Create new post
const createPost = async (req, res) => {
    try {
        req.body.createdBy = req.user.userId;

        if (req.files && req.files.image) {
            const postImage = req.files.image;
            if (!postImage.mimetype.startsWith("image")) {
                throw new BadRequestError("Please upload an image file");
            }

            const imagePaths = path.join(__dirname, `../public/uploads/${postImage.name}`);

            // Ensure the directory exists
            if (!fs.existsSync(path.dirname(imagePaths))) {
                fs.mkdirSync(path.dirname(imagePaths), { recursive: true });
            }

            await postImage.mv(imagePaths);
            req.body.image = postImage.name; // Image path added to the request body
        }

        const post = await Post.create(req.body);
        res.status(StatusCodes.CREATED).json({ post });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
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
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        if (title === "" || description === "") {
            throw new BadRequestError("Title and description fields cannot be empty");
        }

        if (req.files && req.files.image) {
            const postImage = req.files.image;
            if (!postImage.mimetype.startsWith("image")) {
                throw new BadRequestError("Please upload an image file");
            }

            const imagePaths = path.join(__dirname, `../public/uploads/${postImage.name}`);

            // Ensure the directory exists
            if (!fs.existsSync(path.dirname(imagePaths))) {
                fs.mkdirSync(path.dirname(imagePaths), { recursive: true });
            }

            await postImage.mv(imagePaths);
            req.body.image = postImage.name; // Image path added to the request body
        }

        const post = await Post.findOneAndUpdate(
            { _id: id, createdBy: req.user.userId },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        if (!post) {
            throw new NotFoundError(`No post with id : ${id}`);
        }

        res.status(StatusCodes.OK).json({ post });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

// Delete post
const deletePost = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findOneAndDelete({ _id: id, createdBy: req.user.userId });
    if (!post) {
        throw new NotFoundError(`No post with id : ${id}`);
    }
    res.status(StatusCodes.OK).send({ message: "Post deleted successfully" });
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
};
