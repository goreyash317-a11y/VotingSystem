import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { candidatesAPI, voteAPI } from '../services/api';

const VotingPage = () => {
  const { electionId } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await candidatesAPI.getCandidates(electionId);
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, [electionId]);

  const handleVote = async () => {
    if (!selectedCandidate) {
      setMessage('Please select a candidate');
      return;
    }

    try {
      await voteAPI.castVote({ candidateId: selectedCandidate, electionId });
      setMessage('Vote cast successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error casting vote');
    }
  };

  return (
    <div className="dashboard">
      <h1>Vote</h1>
      {message && <p style={{ color: message.includes('successfully') ? 'green' : 'red' }}>{message}</p>}
      <ul className="candidate-list">
        {candidates.map((candidate) => (
          <li key={candidate._id} className="candidate-item">
            <div>
              <h3>{candidate.name}</h3>
              <p>Party: {candidate.party}</p>
            </div>
            <input
              type="radio"
              name="candidate"
              value={candidate._id}
              onChange={(e) => setSelectedCandidate(e.target.value)}
            />
          </li>
        ))}
      </ul>
      <button onClick={handleVote} className="btn vote-btn">Cast Vote</button>
    </div>
  );
};

export default VotingPage;