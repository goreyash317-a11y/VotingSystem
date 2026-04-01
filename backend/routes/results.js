const express = require('express');
const { getResults, verifyChain } = require('../controllers/resultController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/:electionId', auth, getResults);
router.get('/:electionId/verify', auth, verifyChain);

module.exports = router;