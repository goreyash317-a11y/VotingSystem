const Vote = require('../models/Vote');
const Election = require('../models/Election');
const Candidate = require('../models/Candidate');

// @desc    Get election results
// @route   GET /api/results/:electionId
// @access  Private
const getResults = async (req, res) => {
  try {
    const electionId = req.params.electionId;

    // Check if election exists
    const election = await Election.findById(electionId);
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }

    // Only show results if election has ended
    if (election.status !== 'ended') {
      return res.status(403).json({ message: 'Results not available until election ends' });
    }

    // Get all votes for the election
    const votes = await Vote.find({ electionId }).populate('candidateId', 'name party');

    // Count votes per candidate
    const results = {};
    votes.forEach(vote => {
      const candidateId = vote.candidateId._id.toString();
      if (!results[candidateId]) {
        results[candidateId] = {
          candidate: vote.candidateId,
          votes: 0
        };
      }
      results[candidateId].votes++;
    });

    res.json(Object.values(results));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify vote chain integrity
// @route   GET /api/results/:electionId/verify
// @access  Private
const verifyChain = async (req, res) => {
  try {
    const electionId = req.params.electionId;

    const votes = await Vote.find({ electionId }).sort({ createdAt: 1 });

    let previousHash = '0';
    let isValid = true;

    for (const vote of votes) {
      const data = vote.voterId + vote.candidateId + vote.electionId + vote.timestamp + previousHash;
      const expectedHash = require('crypto').createHash('sha256').update(data).digest('hex');

      if (vote.hash !== expectedHash) {
        isValid = false;
        break;
      }

      previousHash = vote.hash;
    }

    res.json({ valid: isValid });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getResults, verifyChain };