const user = require("../models/user");
const token = require("../models/token");

// Get all users
const getUsers = async (req, res) => {
    try {
        const result = await user.getAll();
        return res.json(result);
    } catch (e) {
        return next(e);
    }
}

// Get one user
const getUser = async (req, res, next) => {
    try {
        const result = await user.get(req.params.id);
        if (!result) return res.sendStatus(404);
        return res.json(result);
    } catch (e) {
        return next(e);
    }
}
// Create a new user
const createUser = async (req, res, next) => {
    try {
        const result = await user.create(req.body);
        if (!result) return res.sendStatus(409);
        return res.status(201).json(result);
    } catch (e) {
        return next(e);
    }
}
// Claim Fibre after scan qr_code as token id from agent
const claimFibre = async (req, res, next) => {
    try {
        const mToken = await token.get(req.params.token_id);
        const mUser = await user.get(req.params.user_id);
        if (!user['fiber']) user['fiber'] = 0;
        mUser['fiber'] = Number(mToken['fiber']) + Number(mUser['fiber']);
        const result = await token.delete(req.params.token_id);   // delete anyway
        if ((Date.now() - mToken['created_at']) > 600000) { // > 10 mins, skip update user
            return  res.sendStatus(404);
        }
            
        const updateResult = await user.update(req.params.user_id, mUser);
        if (!updateResult) return res.sendStatus(404);
        return res.json(mUser);
    } catch(e) {
        return next(e);
    }
}
// Delete a user
const deleteUser = async (req, res, next) => {
    try {
        const result = await user.delete(req.params.id);
        if (!result) return res.sendStatus(404);
        return res.sendStatus(200);
    } catch (e) {
        return next(e);
    }
}

// Update a user
const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const doc = await user.get(id);
        if (!doc) return res.sendStatus(404);

        // Merge existing fields with the ones to be updated
        Object.keys(data).forEach((key) => (doc[key] = data[key]));

        const updateResult = await user.update(id, doc);
        if (!updateResult) return res.sendStatus(404);

        return res.json(doc);
    } catch (e) {
        return next(e);
    }
}

// Replace a user
const replaceUser = async (req, res, next) => {
    try {
        const updateResult = await user.update(req.params.id, req.body);
        if (!updateResult) return res.sendStatus(404);

        const result = await user.get(req.params.id);
        return res.json(result);
    } catch (e) {
        return next(e);
    }
}

module.exports = {
    getUsers,
    getUser,
    claimFibre,
    createUser,
    deleteUser,
    updateUser,
    replaceUser,
};
