const post = require("../models/post");
const comment = require("../models/comment");

// Get all posts
const getPosts = async (req, res) => {
    try {
        const result = await post.getAll();
        return res.json(result);
    } catch (e) {
        return next(e);
    }
}

// Get one post
const getPost = async (req, res, next) => {
    try {
        const result = await post.get(req.params.id);
        if (!result) return res.sendStatus(404);
        return res.json(result);
    } catch (e) {
        return next(e);
    }
}

// Get post's comments
const getPostComments = async (req, res, next) => {
    try {
        const postDoc = await post.get(req.params.id);
        if (!postDoc) return res.sendStatus(404);

        const result = await comment.getFromIds(userDoc['comments']);
        return res.json(result);
    } catch (e) {
        return next(e);
    }
}

// Create a new post
const createPost = async (req, res, next) => {
    try {
        const result = await post.create(req.body);
        if (!result) return res.sendStatus(409);
        return res.status(201).json(result);
    } catch (e) {
        return next(e);
    }
}

// Delete a post
const deletePost = async (req, res, next) => {
    try {
        const result = await post.delete(req.params.id);
        if (!result) return res.sendStatus(404);
        return res.sendStatus(200);
    } catch (e) {
        return next(e);
    }
}

// Update a post
const updatePost = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const doc = await post.get(id);
        if (!doc) return res.sendStatus(404);

        // Merge existing fields with the ones to be updated
        Object.keys(data).forEach((key) => (doc[key] = data[key]));

        const updateResult = await post.update(id, doc);
        if (!updateResult) return res.sendStatus(404);

        return res.json(doc);
    } catch (e) {
        return next(e);
    }
}

// Replace a post
const replacePost = async (req, res, next) => {
    try {
        const updateResult = await post.update(req.params.id, req.body);
        if (!updateResult) return res.sendStatus(404);

        const result = await post.get(req.params.id);
        return res.json(result);
    } catch (e) {
        return next(e);
    }
}

module.exports = {
    getPosts,
    getPost,
    getPostComments,
    createPost,
    deletePost,
    updatePost,
    replacePost,
};
