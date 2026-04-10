import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/admin.css';

export default function AdminDashboard() {
  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Platform management and moderation center</p>
      </div>

      {/* Top Stats Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-icon tooltip-users">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--admin-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div className="stat-number">1245</div>
          <div className="stat-title">Total Users</div>
          <div className="stat-desc">Registered accounts</div>
        </div>
        
        <div className="admin-stat-card">
          <div className="stat-icon tooltip-reviews">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--admin-warning)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <div className="stat-number">8</div>
          <div className="stat-title">Pending Reviews</div>
          <div className="stat-desc">Awaiting approval</div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon tooltip-recipes">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--admin-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
          </div>
          <div className="stat-number">567</div>
          <div className="stat-title">Total Recipes</div>
          <div className="stat-desc">Published content</div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon tooltip-flagged">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--admin-danger)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <div className="stat-number">3</div>
          <div className="stat-title">Flagged Content</div>
          <div className="stat-desc">Requires attention</div>
        </div>
      </div>

      <div className="admin-main-grid">
        {/* Left Column */}
        <div className="admin-col-left">
          <div className="admin-card quick-actions-container">
            <h2 className="admin-card-title">Quick Actions</h2>
            <div className="quick-actions-grid">
              
              <Link to="/admin/review-queue" className="quick-action-box active-action">
                <div className="action-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </div>
                <h3>Review Queue</h3>
                <p>Approve or reject pending recipes</p>
              </Link>

              <Link to="/admin/manage-users" className="quick-action-box">
                <div className="action-icon">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h3>Manage Users</h3>
                <p>View and moderate user accounts</p>
              </Link>

              <Link to="/admin/manage-categories" className="quick-action-box">
                <div className="action-icon">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                </div>
                <h3>Manage Categories</h3>
                <p>Add or edit recipe categories</p>
              </Link>
              
              <Link to="/admin/" className="quick-action-box">
                <div className="action-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <h3>Featured Content</h3>
                <p>Manage homepage features</p>
              </Link>

            </div>
          </div>

          <div className="admin-card pending-reviews">
            <div className="pending-header">
              <h2 className="admin-card-title">Pending Reviews</h2>
              <Link to="/admin/review-queue" className="view-all-link">View All &rarr;</Link>
            </div>
            
            <div className="pending-list">
              <div className="pending-item">
                <div className="pending-item-img placeholder-img"></div>
                <div className="pending-item-info">
                  <h4>Mushroom Risotto</h4>
                  <p>by Chef Mario &bull; 1 day ago</p>
                </div>
                <Link to="/admin/review-queue" className="admin-btn admin-btn-primary">Review Now</Link>
              </div>

              <div className="pending-item">
                <div className="pending-item-img placeholder-img"></div>
                <div className="pending-item-info">
                  <h4>Grilled Salmon</h4>
                  <p>by Chef Sarah &bull; 2 days ago</p>
                </div>
                <Link to="/admin/review-queue" className="admin-btn admin-btn-primary">Review Now</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="admin-col-right">
          
          <div className="admin-card">
            <h2 className="admin-card-title">Popular Recipes</h2>
            <ul className="popular-list">
              <li>
                <div className="popular-info">
                  <strong>Spaghetti Carbonara</strong>
                  <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> 1245 views</span>
                </div>
                <div className="popular-rating">&starf; 4.8/5</div>
              </li>
              <li>
                <div className="popular-info">
                  <strong>Chicken Teriyaki</strong>
                  <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> 987 views</span>
                </div>
                <div className="popular-rating">&starf; 4.7/5</div>
              </li>
              <li>
                <div className="popular-info">
                  <strong>Greek Salad</strong>
                  <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> 856 views</span>
                </div>
                <div className="popular-rating">&starf; 4.6/5</div>
              </li>
            </ul>
          </div>

          <div className="admin-card">
            <h2 className="admin-card-title">Recent Activity</h2>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-text">
                  <strong>New user registered</strong>
                  <div>john.doe@example.com</div>
                </div>
                <div className="activity-time">5 min ago</div>
              </div>
              <div className="activity-item">
                <div className="activity-text">
                  <strong>Recipe approved</strong>
                  <div>Beef Wellington</div>
                </div>
                <div className="activity-time">1 hour ago</div>
              </div>
              <div className="activity-item">
                <div className="activity-text">
                  <strong>Recipe rejected</strong>
                  <div>Caesar Salad</div>
                </div>
                <div className="activity-time">2 hours ago</div>
              </div>
            </div>
          </div>

          <div className="admin-card system-status-card">
            <h2 className="admin-card-title with-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--admin-success)" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg> System Status
            </h2>
            <ul className="status-list">
              <li>&bull; All services operational</li>
              <li>&bull; Database: Healthy</li>
              <li>&bull; API Response: 45ms avg</li>
              <li>&bull; Uptime: 99.9%</li>
            </ul>
          </div>

        </div>
      </div>
      
      {/* System Behavior */}
      <div className="admin-system-behavior">
        <h3>SYSTEM BEHAVIOR</h3>
        <ul>
          <li>Admin dashboard provides platform overview</li>
          <li>Real-time statistics updated automatically</li>
          <li>Quick access to key moderation tasks</li>
          <li>Pending reviews require immediate attention</li>
          <li>Activity log tracks all admin actions</li>
          <li>Popular recipes help identify trending content</li>
          <li>System status monitoring for platform health</li>
          <li>Role-based access: Admin-only view</li>
        </ul>
      </div>

    </div>
  );
}
