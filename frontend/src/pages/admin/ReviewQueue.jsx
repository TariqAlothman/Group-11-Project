import React, { useState } from 'react';
import '../../styles/admin.css';

export default function ReviewQueue() {
  const [pendingRecipes, setPendingRecipes] = useState([
    {
      id: 1,
      title: 'Mushroom Risotto',
      chef: 'Chef Mario',
      cuisine: 'Italian',
      submittedDate: 'Feb 24, 2026',
      description: 'A classic Italian dish with creamy arborio rice, mushrooms, and parmesan cheese. Perfect for a cozy dinner.',
      waitingTime: '1 day waiting',
      waitingSeverity: 'warning', // warning, danger
    },
    {
      id: 2,
      title: 'Grilled Salmon with Herbs',
      chef: 'Chef Sarah',
      cuisine: 'Mediterranean',
      submittedDate: 'Feb 22, 2026',
      description: 'A classic Italian dish with creamy arborio rice, mushrooms, and parmesan cheese. Perfect for a cozy dinner.',
      waitingTime: '3 days waiting',
      waitingSeverity: 'danger',
    },
    {
      id: 3,
      title: 'Pad Thai',
      chef: 'Chef Tom',
      cuisine: 'Thai',
      submittedDate: 'Feb 21, 2026',
      description: 'A classic Italian dish with creamy arborio rice, mushrooms, and parmesan cheese. Perfect for a cozy dinner.',
      waitingTime: '4 days waiting',
      waitingSeverity: 'danger',
    }
  ]);

  const handleAction = (id) => {
    setPendingRecipes(prev => prev.filter(recipe => recipe.id !== id));
  };


  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Review Queue</h1>
        <p>Approve, reject, or delete pending recipe submissions</p>
      </div>

      <div className="review-stats-grid">
        <div className="review-stat-box warning-border">
          <span className="review-stat-label">Pending Reviews</span>
          <span className="review-stat-value">{pendingRecipes.length}</span>
        </div>
        <div className="review-stat-box neutral-border">
          <span className="review-stat-label">Avg Review Time</span>
          <span className="review-stat-value">2.5 days</span>
        </div>
      </div>

      <div className="admin-card review-list-card">
        {pendingRecipes.map(recipe => (
          <div key={recipe.id} className="review-list-item">
            <div className="review-item-img placeholder-img"></div>
            <div className="review-item-content">
              <div className="review-item-header">
                <div className="review-item-title-row">
                  <h3>{recipe.title}</h3>
                  <span className={`admin-badge admin-badge-${recipe.waitingSeverity}`}>{recipe.waitingTime}</span>
                </div>
                <div className="review-item-meta">
                  <span>by {recipe.chef}</span>
                  <span className="admin-badge admin-badge-neutral">{recipe.cuisine}</span>
                  <span className="meta-date">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Submitted {recipe.submittedDate}
                  </span>
                </div>
              </div>
              
              <p className="review-item-desc">{recipe.description}</p>
              
              <div className="review-item-actions">
                <button className="admin-btn admin-btn-outline" onClick={() => alert('Viewing details...')}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px'}}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> View Full Details
                </button>
                <button className="admin-btn admin-btn-success-solid" onClick={() => handleAction(recipe.id)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px'}}><polyline points="20 6 9 17 4 12"></polyline></svg> Approve
                </button>
                <button className="admin-btn admin-btn-danger-outline" onClick={() => handleAction(recipe.id)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px'}}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Reject
                </button>
                <button className="admin-btn admin-btn-icon-only admin-btn-danger-outline" onClick={() => handleAction(recipe.id)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-system-behavior">
        <h3>SYSTEM BEHAVIOR</h3>
        <ul>
          <li>Pending recipes sorted by submission date (oldest first)</li>
          <li>Admins can view full recipe details before decision</li>
          <li>Approve: Recipe published to public catalog immediately</li>
          <li>Reject: Reason sent to chef via email for revision</li>
          <li>Delete: Permanent removal (use for policy violations)</li>
          <li>All admin actions logged with timestamp and user</li>
          <li>Chefs notified of approval/rejection via email</li>
          <li>Rejected recipes can be edited and resubmitted</li>
        </ul>
      </div>

    </div>
  );
}
