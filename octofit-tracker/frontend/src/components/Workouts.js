import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

const INTENSITY_CONFIG = {
  Extreme:     { badge: 'danger',   bar: 100, icon: '🔥' },
  'Very High': { badge: 'warning',  bar: 80,  icon: '⚡' },
  High:        { badge: 'primary',  bar: 60,  icon: '💪' },
  Moderate:    { badge: 'success',  bar: 40,  icon: '🏃' },
  Low:         { badge: 'secondary',bar: 20,  icon: '🧘' },
};

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `${API_BASE}/workouts/`;

  useEffect(() => {
    console.log('Workouts: fetching from', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts: fetched data', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Workouts: fetch error', err);
        setLoading(false);
      });
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <div className="section-wrapper">
        <h2 className="page-heading">💪 Workouts</h2>
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {workouts.map((workout) => {
              const cfg = INTENSITY_CONFIG[workout.intensity] || { badge: 'secondary', bar: 0, icon: '🏋️' };
              return (
                <div className="col-md-6 col-lg-4" key={workout.id}>
                  <div className="card h-100 shadow-sm">
                    <div className={`card-header bg-${cfg.badge} ${cfg.badge === 'warning' ? 'text-dark' : 'text-white'} d-flex justify-content-between align-items-center`}>
                      <span className="fw-bold">{cfg.icon} {workout.name}</span>
                      <span className={`badge bg-white text-${cfg.badge}`}>{workout.intensity}</span>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <p className="card-text text-muted flex-grow-1">{workout.description}</p>
                      <div className="mt-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <small className="text-muted">Intensity</small>
                          <small className="text-muted">{cfg.bar}%</small>
                        </div>
                        <div className="progress" style={{height: '6px'}}>
                          <div
                            className={`progress-bar bg-${cfg.badge}`}
                            role="progressbar"
                            style={{width: `${cfg.bar}%`}}
                            aria-valuenow={cfg.bar}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-footer d-flex justify-content-between align-items-center">
                      <span className="badge bg-info text-dark">⏱ {workout.duration}</span>
                      <span className={`badge bg-${cfg.badge} ${cfg.badge === 'warning' ? 'text-dark' : ''}`}>
                        {workout.intensity}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <p className="text-muted mt-3 mb-0"><small>{workouts.length} workout(s) available</small></p>
      </div>
    </div>
  );
}

export default Workouts;

