const agent = require("../models/agent");
const token = require("../models/token");

// Get all agents
const getAgents = async (req, res) => {
    try {
        const result = await agent.getAll();
        return res.json(result);
    } catch (e) {
        return next(e);
    }
}

// Get one agent
const getAgent = async (req, res, next) => {
    try {
        const result = await agent.get(req.params.id);
        if (!result) return res.sendStatus(404);
        return res.json(result);
    } catch (e) {
        return next(e);
    }
}
// Create a new agent
const createAgent = async (req, res, next) => {
    try {
        const result = await agent.create(req.body);
        if (!result) return res.sendStatus(404);
        return res.status(201).json(result);
    } catch (e) {
        return next(e);
    }
}
// Request Token after verification succeed
const requestToken = async (req, res, next) => {
    try {
        const time_now = Date.now();
        const fiber = req.params.fiber;
        const mAgent = await agent.get(req.params.agent_id);
        if (!mAgent) return res.sendStatus(404);
        // allow creation of token if agent exist
        const result = await token.create({"created_at":time_now,"fiber":fiber});
        if (!result) return res.sendStatus(404);
        return res.json(result);
    } catch(e) {
        return next(e);
    }
}
// Delete a agent
const deleteAgent = async (req, res, next) => {
    try {
        const result = await agent.delete(req.params.id);
        if (!result) return res.sendStatus(404);
        return res.sendStatus(200);
    } catch (e) {
        return next(e);
    }
}

// Update a agent
const updateAgent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const doc = await agent.get(id);
        if (!doc) return res.sendStatus(404);

        // Merge existing fields with the ones to be updated
        Object.keys(data).forEach((key) => (doc[key] = data[key]));

        const updateResult = await agent.update(id, doc);
        if (!updateResult) return res.sendStatus(404);

        return res.json(doc);
    } catch (e) {
        return next(e);
    }
}

// Replace a agent
const replaceAgent = async (req, res, next) => {
    try {
        const updateResult = await agent.update(req.params.id, req.body);
        if (!updateResult) return res.sendStatus(404);

        const result = await agent.get(req.params.id);
        return res.json(result);
    } catch (e) {
        return next(e);
    }
}

module.exports = {
    getAgents,
    getAgent,
    requestToken,
    createAgent,
    deleteAgent,
    updateAgent,
    replaceAgent,
};
