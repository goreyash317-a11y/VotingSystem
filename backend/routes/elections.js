const express = require('express');
const { getElections, createElection, startElection, endElection } = require('../controllers/electionController');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

const router = express.Router();

router.get('/', auth, getElections);
router.post('/', auth, roleAuth('admin'), createElection);
router.put('/:id/start', auth, roleAuth('admin'), startElection);
router.put('/:id/end', auth, roleAuth('admin'), endElection);

module.exports = router;