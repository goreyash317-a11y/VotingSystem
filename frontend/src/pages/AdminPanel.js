import React, { useState, useEffect } from 'react';
import { electionsAPI, candidatesAPI } from '../services/api';

const AdminPanel = () => {
  const [elections, setElections] = useState([]);
  const [newElection, setNewElection] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: ''
  });
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    party: '',
    electionId: ''
  });

  useEffect(() => {
    fetchElections();
  }, []);

  const fetchElections = async () => {
    try {
      const response = await electionsAPI.getElections();
      setElections(response.data);
    } catch (error) {
      console.error('Error fetching elections:', error);
    }
  };

  const handleCreateElection = async (e) => {
    e.preventDefault();
    try {
      await electionsAPI.createElection(newElection);
      setNewElection({ title: '', description: '', startDate: '', endDate: '' });
      fetchElections();
    } catch (error) {
      console.error('Error creating election:', error);
    }
  };

  const handleStartElection = async (id) => {
    try {
      await electionsAPI.startElection(id);
      fetchElections();
    } catch (error) {
      console.error('Error starting election:', error);
    }
  };

  const handleEndElection = async (id) => {
    try {
      await electionsAPI.endElection(id);
      fetchElections();
    } catch (error) {
      console.error('Error ending election:', error);
    }
  };

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    try {
      await candidatesAPI.addCandidate(newCandidate);
      setNewCandidate({ name: '', party: '', electionId: '' });
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Admin Panel</h1>

      <h2>Create Election</h2>
      <form onSubmit={handleCreateElection} className="form-container">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={newElection.title}
            onChange={(e) => setNewElection({...newElection, title: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={newElection.description}
            onChange={(e) => setNewElection({...newElection, description: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="datetime-local"
            value={newElection.startDate}
            onChange={(e) => setNewElection({...newElection, startDate: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>End Date:</label>
          <input
            type="datetime-local"
            value={newElection.endDate}
            onChange={(e) => setNewElection({...newElection, endDate: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="btn">Create Election</button>
      </form>

      <h2>Add Candidate</h2>
      <form onSubmit={handleAddCandidate} className="form-container">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={newCandidate.name}
            onChange={(e) => setNewCandidate({...newCandidate, name: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Party:</label>
          <input
            type="text"
            value={newCandidate.party}
            onChange={(e) => setNewCandidate({...newCandidate, party: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Election:</label>
          <select
            value={newCandidate.electionId}
            onChange={(e) => setNewCandidate({...newCandidate, electionId: e.target.value})}
            required
          >
            <option value="">Select Election</option>
            {elections.map(election => (
              <option key={election._id} value={election._id}>{election.title}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn">Add Candidate</button>
      </form>

      <h2>Manage Elections</h2>
      <ul className="election-list">
        {elections.map((election) => (
          <li key={election._id} className="election-item">
            <h3>{election.title}</h3>
            <p>Status: {election.status}</p>
            {election.status === 'upcoming' && (
              <button onClick={() => handleStartElection(election._id)} className="btn">Start</button>
            )}
            {election.status === 'active' && (
              <button onClick={() => handleEndElection(election._id)} className="btn">End</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;