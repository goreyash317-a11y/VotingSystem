const express = require('express');
const { castVote } = require('../controllers/voteController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, castVote);

module.exports = router;