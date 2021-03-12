const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/all', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.get('/claim/:token_id/:user_id', userController.claimFibre);
router.delete('/:id', userController.deleteUser);
router.patch('/:id', userController.updateUser);
router.put('/:id', userController.replaceUser);

module.exports = router;
