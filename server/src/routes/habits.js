const express = require('express');
const habitController = require('../controllers/habitController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.post('/', habitController.create);
router.get('/', habitController.getAll);
router.put('/:id', habitController.update);
router.delete('/:id', habitController.delete);
router.post('/:id/complete', habitController.toggleComplete);

module.exports = router;