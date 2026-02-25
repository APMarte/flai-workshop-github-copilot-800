import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

const TEAM_COLORS = {
  'Team Marvel': 'danger',
  'Team DC': 'primary',
};

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${API_BASE}/teams/`;

  useEffect(() => {
    console.log('Teams: fetching from', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Teams: fetched data', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Teams: fetch error', err);
        setLoading(false);
      });
  }, [endpoint]);

  const parseMembers = (members) => {
    if (Array.isArray(members)) return members;
    try { return JSON.parse(members || '[]'); } catch { return []; }
  };

  return (
    <div className="container mt-4">
      <div className="section-wrapper">
        <h2 className="page-heading">🛡️ Teams</h2>
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {teams.map(team => {
              const color = TEAM_COLORS[team.name] || 'secondary';
              const members = parseMembers(team.members);
              return (
                <div key={team.id} className="col-md-6">
                  <div className="card h-100">
                    <div className={`card-header bg-${color} text-white d-flex justify-content-between align-items-center`}>
                      <h5 className="mb-0">🛡️ {team.name}</h5>
                      <span className="badge bg-light text-dark">{members.length} members</span>
                    </div>
                    <div className="card-body p-0">
                      <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                          <tr>
                            <th scope="col" style={{width: '3rem'}}>#</th>
                            <th scope="col">Hero Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {members.map((member, idx) => (
                            <tr key={idx}>
                              <td className="text-muted">{idx + 1}</td>
                              <td className="fw-semibold">{member}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <p className="text-muted mt-3 mb-0"><small>{teams.length} team(s) found</small></p>
      </div>
    </div>
  );
}

export default Teams;

