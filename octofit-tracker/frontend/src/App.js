import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import './App.css';
import logo from './octofitapp-small.png';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

function Home() {
  return (
    <div className="container mt-4">
      <div className="hero-section text-center">
        <h1>🏋️ OctoFit Tracker</h1>
        <p className="lead">Track your fitness activities, join teams, and compete on the leaderboard!</p>
        <p className="mb-0 opacity-75">Select a section below or use the navigation menu above.</p>
      </div>
      <div className="row g-3 text-center">
        {[
          { to: '/users',      icon: '👤', label: 'Users' },
          { to: '/teams',      icon: '🛡️', label: 'Teams' },
          { to: '/activities', icon: '🏃', label: 'Activities' },
          { to: '/leaderboard',icon: '🏆', label: 'Leaderboard' },
          { to: '/workouts',   icon: '💪', label: 'Workouts' },
        ].map(({ to, icon, label }) => (
          <div key={to} className="col-6 col-md-4 col-lg-2">
            <Link to={to} className="text-decoration-none">
              <div className="stat-card">
                <div className="stat-icon">{icon}</div>
                <div className="stat-label">{label}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
              <img src={logo} alt="OctoFit" height="38" width="38" />
              OctoFit Tracker
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users">👤 Users</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/teams">🛡️ Teams</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/activities">🏃 Activities</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/leaderboard">🏆 Leaderboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/workouts">💪 Workouts</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>

        <footer className="bg-dark text-white text-center py-3 mt-5">
          <small>© 2024 OctoFit Tracker — Stay fit, stay strong 💪</small>
        </footer>
      </div>
    </Router>
  );
}

export default App;


