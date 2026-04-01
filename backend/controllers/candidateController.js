const Candidate = require('../models/Candidate');
const Election = require('../models/Election');

// @desc    Get candidates for an election
// @route   GET /api/candidates/:electionId
// @access  Private
const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find({ electionId: req.params.electionId });
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add candidate
// @route   POST /api/candidates
// @access  Private/Admin
const addCandidate = async (req, res) => {
  try {
    const { name, party, electionId } = req.body;

    // Check if election exists
    const election = await Election.findById(electionId);
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }

    const candidate = await Candidate.create({
      name,
      party,
      electionId
    });

    res.status(201).json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCandidates, addCandidate };