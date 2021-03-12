const community = require("../models/community");
const user = require("../models/user");
const post = require("../models/post");

// Get all communities
const getCommunities = async (req, res) => {
    try {
        const result = await community.getAll();
        return res.json(result);
    } catch (e) {
        return next(e);
    }
}

// Get one community
const getCommunity = async (req, res, next) => {
    try {
        const result = await community.get(req.params.id);
        if (!result) return res.sendStatus(404);
        return res.json(result);
    } catch (e) {
        return next(e);
    }
}

// Get community's posts
const getCommunityPosts = async (req, res, next) => {
    try {
        const communityDoc = await community.get(req.params.id);
        if (!communityDoc) return res.sendStatus(404);

        const result = await post.getFromIds(communityDoc['posts']);
        return res.json(result);
    } catch (e) {
        return next(e);
    }
}

// Get community's companions
const getCommunityCompanions = async (req, res, next) => {
    try {
        const communityDoc = await community.get(req.params.id);
        if (!communityDoc) return res.sendStatus(404);

        const result = await user.getFromIds(communityDoc['companions']);
        return res.json(result);
    } catch (e) {
        return next(e);
    }
}

// Create a new community
const createCommunity = async (req, res, next) => {
    try {
        const result = await community.create(req.body);
        if (!result) return res.sendStatus(409);
        return res.status(201).json(result);
    } catch (e) {
        return next(e);
    }
}

// Delete a community
const deleteCommunity = async (req, res, next) => {
    try {
        const result = await community.delete(req.params.id);
        if (!result) return res.sendStatus(404);
        return res.sendStatus(200);
    } catch (e) {
        return next(e);
    }
}

// Update a community
const updateCommunity = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const doc = await community.get(id);
        if (!doc) return res.sendStatus(404);

        // Merge existing fields with the ones to be updated
        Object.keys(data).forEach((key) => (doc[key] = data[key]));

        const updateResult = await community.update(id, doc);
        if (!updateResult) return res.sendStatus(404);

        return res.json(doc);
    } catch (e) {
        return next(e);
    }
}

// Replace a community
const replaceCommunity = async (req, res, next) => {
    try {
        const updateResult = await community.update(req.params.id, req.body);
        if (!updateResult) return res.sendStatus(404);

        const result = await community.get(req.params.id);
        return res.json(result);
    } catch (e) {
        return next(e);
    }
}

module.exports = {
    getCommunities,
    getCommunity,
    getCommunityPosts,
    getCommunityCompanions,
    createCommunity,
    deleteCommunity,
    updateCommunity,
    replaceCommunity,
};
