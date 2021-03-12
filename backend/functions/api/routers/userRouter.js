const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/all', userController.getUsers);
router.get('/:id', userController.getUser);
router.get('/:id/posts', userController.getUserPosts);
router.get('/:id/companions', userController.getUserCompanions);
router.get('/:id/communities', userController.getUserCommunities);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);
router.patch('/:id', userController.updateUser);
router.put('/:id', userController.replaceUser);

module.exports = router;