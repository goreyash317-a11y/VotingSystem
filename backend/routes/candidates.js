const express = require('express');
const { getCandidates, addCandidate } = require('../controllers/candidateController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

const router = express.Router();

router.get('/:electionId', auth, getCandidates);
router.post('/', auth, roleAuth('admin'), addCandidate);

module.exports = router;