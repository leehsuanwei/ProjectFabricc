const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/all', postController.getPosts);
router.get('/:id', postController.getPost);
router.get('/:id/comments', postController.getPostComments);
router.post('/', postController.createPost);
router.delete('/:id', postController.deletePost);
router.patch('/:id', postController.updatePost);
router.put('/:id', postController.replacePost);

module.exports = router;