const express = require('express');
const agentController = require('../controllers/agentController');

const router = express.Router();

router.get('/all', agentController.getAgents);
router.get('/:id', agentController.getAgent);
router.post('/', agentController.createAgent);
router.get('/token/:agent_id/:fibre', agentController.requestToken);
router.delete('/:id', agentController.deleteAgent);
router.patch('/:id', agentController.updateAgent);
router.put('/:id', agentController.replaceAgent);

module.exports = router;
