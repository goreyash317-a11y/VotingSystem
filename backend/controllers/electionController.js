const Election = require('../models/Election');

// @desc    Get all elections
// @route   GET /api/elections
// @access  Private
const getElections = async (req, res) => {
  try {
    const elections = await Election.find({});
    res.json(elections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create election
// @route   POST /api/elections
// @access  Private/Admin
const createElection = async (req, res) => {
  try {
    const { title, description, startDate, endDate } = req.body;

    const election = await Election.create({
      title,
      description,
      startDate,
      endDate
    });

    res.status(201).json(election);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Start election
// @route   PUT /api/elections/:id/start
// @access  Private/Admin
const startElection = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }

    election.status = 'active';
    await election.save();

    res.json(election);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    End election
// @route   PUT /api/elections/:id/end
// @access  Private/Admin
const endElection = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }

    election.status = 'ended';
    await election.save();

    res.json(election);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getElections, createElection, startElection, endElection };