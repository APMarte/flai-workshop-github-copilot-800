import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function rankMedal(index) {
  if (index === 0) return '🥇';
  if (index === 1) return '🥈';
  if (index === 2) return '🥉';
  return index + 1;
}

function rowVariant(index) {
  if (index === 0) return 'table-warning';
  if (index === 1) return 'table-secondary';
  if (index === 2) return 'table-danger';
  return '';
}

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${API_BASE}/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard: fetching from', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard: fetched data', data);
        setEntries(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Leaderboard: fetch error', err);
        setLoading(false);
      });
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <div className="section-wrapper">
        <h2 className="page-heading">🏆 Leaderboard</h2>
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col" style={{width: '5rem'}}>Rank</th>
                  <th scope="col">Hero</th>
                  <th scope="col" className="text-end">Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={entry.id} className={rowVariant(index)}>
                    <td className="text-center fw-bold fs-5">{rankMedal(index)}</td>
                    <td className="fw-semibold">{entry.user}</td>
                    <td className="text-end">
                      <span className="badge bg-primary fs-6 px-3 py-2">{entry.score.toLocaleString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-muted mt-2 mb-0"><small>{entries.length} participant(s)</small></p>
      </div>
    </div>
  );
}

export default Leaderboard;

