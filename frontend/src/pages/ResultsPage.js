import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { resultsAPI } from '../services/api';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ResultsPage = () => {
  const { electionId } = useParams();
  const [results, setResults] = useState([]);
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await resultsAPI.getResults(electionId);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    const verifyChain = async () => {
      try {
        const response = await resultsAPI.verifyChain(electionId);
        setIsValid(response.data.valid);
      } catch (error) {
        console.error('Error verifying chain:', error);
      }
    };

    fetchResults();
    verifyChain();
  }, [electionId]);

  const chartData = {
    labels: results.map(result => result.candidate.name),
    datasets: [
      {
        label: 'Votes',
        data: results.map(result => result.votes),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="results">
      <h1>Election Results</h1>
      <p>Blockchain Integrity: {isValid === null ? 'Checking...' : isValid ? 'Valid' : 'Invalid'}</p>
      <div className="chart-container">
        <Bar data={chartData} />
      </div>
      <ul>
        {results.map((result) => (
          <li key={result.candidate._id}>
            {result.candidate.name} ({result.candidate.party}): {result.votes} votes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsPage;