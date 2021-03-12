const express = require('express');
const commentController = require('../controllers/commentController');

const router = express.Router();

router.get('/all', commentController.getComments);
router.get('/:id', commentController.getComment);
router.post('/', commentController.createComment);
router.delete('/:id', commentController.deleteComment);
router.patch('/:id', commentController.updateComment);
router.put('/:id', commentController.replaceComment);

module.exports = router;