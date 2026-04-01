import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { electionsAPI } from '../services/api';

const Dashboard = () => {
  const [elections, setElections] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);

    const fetchElections = async () => {
      try {
        const response = await electionsAPI.getElections();
        setElections(response.data);
      } catch (error) {
        console.error('Error fetching elections:', error);
      }
    };

    fetchElections();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}</h1>
      <button onClick={handleLogout} className="btn">Logout</button>
      
      {user.role === 'admin' && (
        <Link to="/admin" className="btn">Admin Panel</Link>
      )}

      <h2>Elections</h2>
      <ul className="election-list">
        {elections.map((election) => (
          <li key={election._id} className="election-item">
            <h3>{election.title}</h3>
            <p>{election.description}</p>
            <p>Status: {election.status}</p>
            {election.status === 'active' && (
              <Link to={`/vote/${election._id}`} className="btn">Vote</Link>
            )}
            {election.status === 'ended' && (
              <Link to={`/results/${election._id}`} className="btn">View Results</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;