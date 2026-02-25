import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

const FITNESS_BADGE = {
  Advanced: 'danger',
  Intermediate: 'warning',
  Beginner: 'success',
};

const EMPTY_FORM = {
  name: '',
  username: '',
  email: '',
  age: '',
  fitness_level: 'Beginner',
  team: '',
};

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const endpoint = `${API_BASE}/users/`;

  const fetchUsers = () => {
    console.log('Users: fetching from', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Users: fetched data', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Users: fetch error', err);
        setLoading(false);
      });
  };

  useEffect(() => { fetchUsers(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openEdit = (user) => {
    setEditUser({
      name: user.name || '',
      username: user.username || '',
      email: user.email || '',
      age: user.age || '',
      fitness_level: user.fitness_level || 'Beginner',
      team: user.team || '',
    });
    setEditId(user.id);
    setSaveError('');
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setSaving(true);
    setSaveError('');
    console.log('Users: saving user', editId, editUser);
    fetch(`${endpoint}${editId}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editUser),
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Users: saved', data);
        setSaving(false);
        setShowModal(false);
        fetchUsers();
      })
      .catch(err => {
        console.error('Users: save error', err);
        setSaveError(`Save failed: ${err.message}`);
        setSaving(false);
      });
  };

  return (
    <div className="container mt-4">
      <div className="section-wrapper">
        <h2 className="page-heading">👤 Users</h2>
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
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Age</th>
                  <th scope="col">Fitness Level</th>
                  <th scope="col">Team</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td className="text-muted">{index + 1}</td>
                    <td className="fw-semibold">{user.name}</td>
                    <td><span className="text-primary fw-mono">@{user.username}</span></td>
                    <td>
                      <a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a>
                    </td>
                    <td>{user.age}</td>
                    <td>
                      <span className={`badge bg-${FITNESS_BADGE[user.fitness_level] || 'secondary'} badge-intensity`}>
                        {user.fitness_level}
                      </span>
                    </td>
                    <td>
                      {user.team
                        ? <span className={`badge ${user.team === 'Team Marvel' ? 'bg-danger' : 'bg-primary'}`}>{user.team}</span>
                        : <span className="text-muted">—</span>}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => openEdit(user)}
                      >
                        ✏️ Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-muted mt-2 mb-0"><small>{users.length} user(s) found</small></p>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">✏️ Edit User</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                {saveError && <div className="alert alert-danger py-2">{saveError}</div>}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Name</label>
                  <input type="text" className="form-control" name="name" value={editUser.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Username</label>
                  <div className="input-group">
                    <span className="input-group-text text-primary fw-mono">@</span>
                    <input type="text" className="form-control fw-mono" name="username" value={editUser.username} onChange={handleChange} />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input type="email" className="form-control" name="email" value={editUser.email} onChange={handleChange} />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Age</label>
                    <input type="number" className="form-control" name="age" value={editUser.age} onChange={handleChange} min="1" max="120" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Fitness Level</label>
                    <select className="form-select" name="fitness_level" value={editUser.fitness_level} onChange={handleChange}>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Team</label>
                  <select className="form-select" name="team" value={editUser.team} onChange={handleChange}>
                    <option value="">— No Team —</option>
                    <option value="Team Marvel">Team Marvel</option>
                    <option value="Team DC">Team DC</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)} disabled={saving}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                  {saving ? <><span className="spinner-border spinner-border-sm me-1" />Saving…</> : '💾 Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;

