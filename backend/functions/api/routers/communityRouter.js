const express = require('express');
const communityController = require('../controllers/communityController');

const router = express.Router();

router.get('/all', communityController.getCommunities);
router.get('/:id', communityController.getCommunity);
router.get('/:id/posts', communityController.getCommunityPosts);
router.get('/:id/companions', communityController.getCommunityCompanions);
router.post('/', communityController.createCommunity);
router.delete('/:id', communityController.deleteCommunity);
router.patch('/:id', communityController.updateCommunity);
router.put('/:id', communityController.replaceCommunity);

module.exports = router;