const comment = require("../models/comment");

// Get all comments
const getComments = async (req, res) => {
    try {
        const result = await comment.getAll();
        return res.json(result);
    } catch (e) {
        return next(e);
    }
}

// Get one comment
const getComment = async (req, res, next) => {
    try {
        const result = await comment.get(req.params.id);
        if (!result) return res.sendStatus(404);
        return res.json(result);
    } catch (e) {
        return next(e);
    }
}

// Create a new comment
const createComment = async (req, res, next) => {
    try {
        const result = await comment.create(req.body);
        if (!result) return res.sendStatus(409);
        return res.status(201).json(result);
    } catch (e) {
        return next(e);
    }
}

// Delete a comment
const deleteComment = async (req, res, next) => {
    try {
        const result = await comment.delete(req.params.id);
        if (!result) return res.sendStatus(404);
        return res.sendStatus(200);
    } catch (e) {
        return next(e);
    }
}

// Update a comment
const updateComment = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const doc = await comment.get(id);
        if (!doc) return res.sendStatus(404);

        // Merge existing fields with the ones to be updated
        Object.keys(data).forEach((key) => (doc[key] = data[key]));

        const updateResult = await comment.update(id, doc);
        if (!updateResult) return res.sendStatus(404);

        return res.json(doc);
    } catch (e) {
        return next(e);
    }
}

// Replace a comment
const replaceComment = async (req, res, next) => {
    try {
        const updateResult = await comment.update(req.params.id, req.body);
        if (!updateResult) return res.sendStatus(404);

        const result = await comment.get(req.params.id);
        return res.json(result);
    } catch (e) {
        return next(e);
    }
}

module.exports = {
    getComments,
    getComment,
    createComment,
    deleteComment,
    updateComment,
    replaceComment,
};
