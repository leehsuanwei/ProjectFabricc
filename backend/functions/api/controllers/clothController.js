const cloth = require("../models/cloth");

// Get all cloths
const getCloths = async (req, res) => {
    try {
        const result = await cloth.getAll();
        return res.json(result);
    } catch (e) {
        return next(e);
    }
}

// Get one cloth
const getCloth = async (req, res, next) => {
    try {
        const result = await cloth.get(req.params.id);
        if (!result) return res.sendStatus(404);
        return res.json(result);
    } catch (e) {
        return next(e);
    }
}
// Create a new cloth
const createCloth = async (req, res, next) => {
    try {
        const result = await cloth.create(req.body);
        if (!result) return res.sendStatus(409);
        return res.status(201).json(result);
    } catch (e) {
        return next(e);
    }
}

// Delete a cloth
const deleteCloth = async (req, res, next) => {
    try {
        const result = await cloth.delete(req.params.id);
        if (!result) return res.sendStatus(404);
        return res.sendStatus(200);
    } catch (e) {
        return next(e);
    }
}

// Update a cloth
const updateCloth = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const doc = await cloth.get(id);
        if (!doc) return res.sendStatus(404);

        // Merge existing fields with the ones to be updated
        Object.keys(data).forEach((key) => (doc[key] = data[key]));

        const updateResult = await cloth.update(id, doc);
        if (!updateResult) return res.sendStatus(404);

        return res.json(doc);
    } catch (e) {
        return next(e);
    }
}

// Replace a cloth
const replaceCloth = async (req, res, next) => {
    try {
        const updateResult = await cloth.update(req.params.id, req.body);
        if (!updateResult) return res.sendStatus(404);

        const result = await cloth.get(req.params.id);
        return res.json(result);
    } catch (e) {
        return next(e);
    }
}

module.exports = {
    getCloths,
    getCloth,
    createCloth,
    deleteCloth,
    updateCloth,
    replaceCloth,
};
