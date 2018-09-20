const express = require('express');
const router = express.Router();
const celebritiesController = require('../controllers/celebrities.controller');

router.post('/', celebritiesController.doCreate);

router.get('/', celebritiesController.list);

router.get('/:id', celebritiesController.get);

router.post('/:id/update', celebritiesController.doUpdate);

router.post('/:id/delete', celebritiesController.delete);

module.exports = router;
