const mongoose = require('mongoose');
const crypto = require('crypto');

const voteSchema = new mongoose.Schema({
  voterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true
  },
  electionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Election',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  hash: {
    type: String,
    required: true
  },
  previousHash: {
    type: String,
    default: '0' // Genesis block
  }
}, {
  timestamps: true
});

// Generate hash before saving
voteSchema.pre('save', function(next) {
  const data = this.voterId + this.candidateId + this.electionId + this.timestamp + this.previousHash;
  this.hash = crypto.createHash('sha256').update(data).digest('hex');
  next();
});

// Static method to get last vote hash for chaining
voteSchema.statics.getLastHash = async function(electionId) {
  const lastVote = await this.findOne({ electionId }).sort({ createdAt: -1 });
  return lastVote ? lastVote.hash : '0';
};

module.exports = mongoose.model('Vote', voteSchema);