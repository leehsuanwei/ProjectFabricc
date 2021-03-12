const express = require('express');
const clothController = require('../controllers/clothController');

const router = express.Router();

router.get('/all', clothController.getCloths);
router.get('/:id', clothController.getCloth);
router.post('/', clothController.createCloth);
router.delete('/:id', clothController.deleteCloth);
router.patch('/:id', clothController.updateCloth);
router.put('/:id', clothController.replaceCloth);

module.exports = router;
