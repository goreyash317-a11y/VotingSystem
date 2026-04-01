const Vote = require('../models/Vote');
const Election = require('../models/Election');
const User = require('../models/User');

// @desc    Cast vote
// @route   POST /api/vote
// @access  Private
const castVote = async (req, res) => {
  try {
    const { candidateId, electionId } = req.body;
    const voterId = req.user._id;

    // Check if election exists and is active
    const election = await Election.findById(electionId);
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }
    if (election.status !== 'active') {
      return res.status(400).json({ message: 'Election is not active' });
    }

    // Check if user has already voted
    const existingVote = await Vote.findOne({ voterId, electionId });
    if (existingVote) {
      return res.status(400).json({ message: 'You have already voted in this election' });
    }

    // Get previous hash
    const previousHash = await Vote.getLastHash(electionId);

    // Create vote
    const vote = await Vote.create({
      voterId,
      candidateId,
      electionId,
      previousHash
    });

    // Update user hasVoted
    await User.findByIdAndUpdate(voterId, { hasVoted: true });

    // Emit real-time update
    const io = req.app.get('io');
    io.emit('voteCast', { electionId, candidateId });

    res.status(201).json({ message: 'Vote cast successfully', hash: vote.hash });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { castVote };