import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

const ACTIVITY_ICONS = {
  Running: '🏃',
  Swimming: '🏊',
  Cycling: '🚴',
  Yoga: '🧘',
  'Weight Training': '🏋️',
  'Martial Arts': '🥋',
  'Hammer Training': '🔨',
  Sprinting: '⚡',
  Flying: '✈️',
  'Combat Training': '⚔️',
};

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${API_BASE}/activities/`;

  useEffect(() => {
    console.log('Activities: fetching from', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Activities: fetched data', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Activities: fetch error', err);
        setLoading(false);
      });
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <div className="section-wrapper">
        <h2 className="page-heading">🏃 Activities</h2>
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Hero</th>
                  <th scope="col">Activity</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={activity.id}>
                    <td className="text-muted">{index + 1}</td>
                    <td className="fw-semibold">{activity.user}</td>
                    <td>
                      <span className="me-1">{ACTIVITY_ICONS[activity.activity_type] || '🏅'}</span>
                      {activity.activity_type}
                    </td>
                    <td>
                      <span className="badge bg-info text-dark badge-intensity">{activity.duration}</span>
                    </td>
                    <td>{activity.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-muted mt-2 mb-0"><small>{activities.length} activity(s) found</small></p>
      </div>
    </div>
  );
}

export default Activities;

