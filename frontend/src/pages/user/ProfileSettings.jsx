import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profileSettings.css';

const ProfileSettings = ({ user }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');

  const handleSave = (e) => {
    e.preventDefault();
    alert("Settings saved successfully!");
  };

  const handleDelete = () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmed) {
      navigate("/login");
    }
  };

  return (
    <main className="profile-settings-page">
      <header className="profile-settings-header">
        <h1>Profile & Settings</h1>
        <p>Manage your account settings and application preferences.</p>
      </header>

      <div className="profile-settings-grid">
        <aside className="settings-sidebar">
          <button 
            className={`settings-tab ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Personal Info
          </button>
          
          <button 
            className={`settings-tab ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="14" x="2" y="3" rx="2" />
              <line x1="8" x2="16" y1="21" y2="21" />
              <line x1="12" x2="12" y1="17" y2="21" />
            </svg>
            Preferences
          </button>

          <button 
            className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            Notifications
          </button>
        </aside>

        <section className="settings-content">
          {activeTab === 'personal' && (
            <form onSubmit={handleSave} className="settings-form">
              <h2 className="settings-section-title">Personal Information</h2>
              
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" defaultValue={user?.name || ""} required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" defaultValue={user?.email || ""} required />
              </div>

              <div className="form-group">
                <label htmlFor="diet">Primary Diet</label>
                <select id="diet" defaultValue="none">
                  <option value="none">No Restrictions</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="pescatarian">Pescatarian</option>
                  <option value="keto">Keto</option>
                </select>
              </div>

              <div className="settings-actions">
                <button type="submit" className="btn-primary">Save Changes</button>
              </div>

              <div className="settings-danger-zone">
                <h3>Danger Zone</h3>
                <p>Permanently delete your account and all saved recipes/history.</p>
                <button type="button" className="btn-danger" onClick={handleDelete}>
                  Delete Account
                </button>
              </div>
            </form>
          )}

          {activeTab === 'preferences' && (
            <div className="settings-form">
              <h2 className="settings-section-title">App Preferences</h2>

              <div className="preference-row">
                <div className="preference-info">
                  <h4>Measurement System</h4>
                  <p>Choose between metric or imperial units for recipes.</p>
                </div>
                <div className="form-group" style={{minWidth: '150px'}}>
                  <select defaultValue="metric">
                    <option value="metric">Metric (g, ml)</option>
                    <option value="imperial">Imperial (oz, cups)</option>
                  </select>
                </div>
              </div>

              <div className="preference-row">
                <div className="preference-info">
                  <h4>Theme Layout</h4>
                  <p>Choose visually dense or spacious display.</p>
                </div>
                <div className="form-group" style={{minWidth: '150px'}}>
                  <select defaultValue="comfortable">
                    <option value="comfortable">Comfortable</option>
                    <option value="compact">Compact</option>
                  </select>
                </div>
              </div>

              <div className="settings-actions">
                <button type="button" className="btn-primary" onClick={handleSave}>Save Preferences</button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-form">
              <h2 className="settings-section-title">Notification Settings</h2>

              <div className="preference-row">
                <div className="preference-info">
                  <h4>Recipe Updates</h4>
                  <p>Get notified when your favorite recipes are updated.</p>
                </div>
                <input type="checkbox" defaultChecked style={{width: '20px', height: '20px'}} />
              </div>

              <div className="preference-row">
                <div className="preference-info">
                  <h4>Chef Submission Status</h4>
                  <p>Alerts regarding your published or pending recipes.</p>
                </div>
                <input type="checkbox" defaultChecked style={{width: '20px', height: '20px'}} />
              </div>

              <div className="preference-row">
                <div className="preference-info">
                  <h4>Weekly Recommendations</h4>
                  <p>Get an email with curated recipe ideas every week.</p>
                </div>
                <input type="checkbox" style={{width: '20px', height: '20px'}} />
              </div>

              <div className="settings-actions">
                <button type="button" className="btn-primary" onClick={handleSave}>Update Notifications</button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProfileSettings;
