import React, { useState, useMemo } from 'react';
import '../../styles/admin.css';

export default function ManageUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Smith',
      joined: 'Feb 2026',
      email: 'john.smith@example.com',
      role: 'User',
      recipes: 0,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Chef Mario',
      joined: 'Jan 2026',
      email: 'mario@example.com',
      role: 'Chef',
      recipes: 15,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Sarah Admin',
      joined: 'Dec 2025',
      email: 'sarah@example.com',
      role: 'Admin',
      recipes: 0,
      status: 'Active',
    },
    {
      id: 4,
      name: 'Tom Johnson',
      joined: 'Jan 2026',
      email: 'tom@example.com',
      role: 'User',
      recipes: 0,
      status: 'Suspended',
    }
  ]);

  const handleSuspendToggle = (id) => {
    setUsers(prev => prev.map(user => {
      if (user.id === id) {
        return { ...user, status: user.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return user;
    }));
  };

  const handleDelete = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  const totalUsers = users.length;
  const chefsCount = users.filter(u => u.role === 'Chef').length;
  const adminsCount = users.filter(u => u.role === 'Admin').length;
  const suspendedCount = users.filter(u => u.status === 'Suspended').length;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Manage Users</h1>
        <p>View, suspend, and manage platform users</p>
      </div>

      <div className="admin-toolbar">
        <div className="search-bar-container">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            className="admin-search-input" 
            placeholder="Search by name or email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="admin-btn admin-btn-outline filter-btn" onClick={() => alert('Filter options...')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px'}}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg> Filter
        </button>
      </div>

      <div className="users-stats-grid">
        <div className="user-stat-card">
          <div className="stat-label">Total Users</div>
          <div className="stat-val">{totalUsers}</div>
        </div>
        <div className="user-stat-card">
          <div className="stat-label">Chefs</div>
          <div className="stat-val">{chefsCount}</div>
        </div>
        <div className="user-stat-card">
          <div className="stat-label">Admins</div>
          <div className="stat-val">{adminsCount}</div>
        </div>
        <div className="user-stat-card border-danger">
          <div className="stat-label text-danger">Suspended</div>
          <div className="stat-val text-danger">{suspendedCount}</div>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Recipes</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar-placeholder">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--admin-primary)" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                    <div>
                      <div className="user-name">{user.name}</div>
                      <div className="user-joined">Joined {user.joined}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`admin-badge admin-badge-${user.role.toLowerCase()}`}>{user.role}</span>
                </td>
                <td>{user.recipes}</td>
                <td>
                  <span className={`status-badge status-${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    {user.status === 'Active' ? (
                      <button className="admin-btn admin-btn-danger-outline action-btn" onClick={() => handleSuspendToggle(user.id)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg> Suspend
                      </button>
                    ) : (
                      <button className="admin-btn admin-btn-success-outline action-btn" onClick={() => handleSuspendToggle(user.id)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Unsuspend
                      </button>
                    )}
                    <button className="admin-btn admin-btn-icon-only admin-btn-danger-outline" onClick={() => handleDelete(user.id)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-system-behavior">
        <h3>SYSTEM BEHAVIOR</h3>
        <ul>
          <li>Search filters users by name or email in real-time</li>
          <li>Suspend: User logged out and access revoked immediately</li>
          <li>Unsuspend: User regains full platform access</li>
          <li>Delete: Permanent removal of user and all associated data</li>
          <li>All actions logged with admin user and timestamp</li>
          <li>Email notification sent to suspended users</li>
          <li>Role badges identify User, Chef, and Admin accounts</li>
          <li>Chefs' published recipes remain live after suspension</li>
        </ul>
      </div>
    </div>
  );
}
