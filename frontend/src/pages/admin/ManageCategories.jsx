import React, { useState } from 'react';
import '../../styles/admin.css';

export default function ManageCategories() {
  const [cuisines, setCuisines] = useState([
    { id: 1, name: 'Italian', recipes: 127 },
    { id: 2, name: 'Japanese', recipes: 89 },
    { id: 3, name: 'Mexican', recipes: 76 },
    { id: 4, name: 'Chinese', recipes: 102 },
    { id: 5, name: 'French', recipes: 65 },
    { id: 6, name: 'Indian', recipes: 94 },
    { id: 7, name: 'Thai', recipes: 58 },
    { id: 8, name: 'American', recipes: 143 }
  ]);

  const [mealTypes, setMealTypes] = useState([
    { id: 1, name: 'Breakfast', recipes: 156 },
    { id: 2, name: 'Lunch', recipes: 234 },
    { id: 3, name: 'Dinner', recipes: 289 },
    { id: 4, name: 'Snack', recipes: 98 },
    { id: 5, name: 'Dessert', recipes: 123 }
  ]);

  const [addingType, setAddingType] = useState(null);
  const [addingValue, setAddingValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const startAdding = (type) => {
    setAddingType(type);
    setAddingValue("");
  };

  const commitAdd = (type, setState) => {
    if (addingValue.trim()) {
      setState(prev => [...prev, { id: Date.now(), name: addingValue.trim(), recipes: 0 }]);
    }
    setAddingType(null);
    setAddingValue("");
  };

  const cancelAdd = () => {
    setAddingType(null);
    setAddingValue("");
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditingValue(item.name);
  };

  const commitEdit = (setState) => {
    if (editingValue.trim() && editingId) {
      setState(prev => prev.map(i => i.id === editingId ? { ...i, name: editingValue.trim() } : i));
    }
    setEditingId(null);
    setEditingValue("");
  };

  const handleImmediateDelete = (id, setState) => {
    // Two-step verification using our inline state
    if (deletingId === id) {
      setState(prev => prev.filter(i => i.id !== id));
      setDeletingId(null);
    } else {
      setDeletingId(id);
      // Auto reset the delete confirmation after 3 seconds
      setTimeout(() => setDeletingId(null), 3000);
    }
  };

  const renderCategoryList = (items, type, stateSetter) => {
    return (
      <div className="category-list">
        {addingType === type && (
          <div className="category-item" style={{backgroundColor: '#F8FAFC'}}>
            <input 
              autoFocus
              type="text"
              className="admin-input-inline"
              value={addingValue}
              onChange={(e) => setAddingValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && commitAdd(type, stateSetter)}
              placeholder={`New ${type} name`}
              style={{ flexGrow: 1, padding: '4px 8px', borderRadius: '4px', border: '1px solid #CBD5E1' }}
            />
            <div className="category-actions" style={{ marginLeft: '10px' }}>
              <button className="admin-btn admin-btn-success" onClick={() => commitAdd(type, stateSetter)}>Save</button>
              <button className="admin-btn admin-btn-outline" onClick={cancelAdd}>Cancel</button>
            </div>
          </div>
        )}
        
        {items.map(item => (
          <div key={item.id} className="category-item">
            {editingId === item.id ? (
              <>
                <input 
                  autoFocus
                  type="text"
                  className="admin-input-inline"
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && commitEdit(stateSetter)}
                  style={{ flexGrow: 1, padding: '4px 8px', borderRadius: '4px', border: '1px solid #3B82F6' }}
                />
                <div className="category-actions" style={{ marginLeft: '10px' }}>
                  <button className="admin-btn admin-btn-success" onClick={() => commitEdit(stateSetter)}>Save</button>
                  <button className="admin-btn admin-btn-outline" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div className="category-info">
                  <strong>{item.name}</strong>
                  <span>{item.recipes} recipes</span>
                </div>
                <div className="category-actions">
                  <button className="admin-btn admin-btn-icon-only admin-btn-outline" onClick={() => startEditing(item)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                  </button>
                  <button 
                    className={`admin-btn admin-btn-icon-only ${deletingId === item.id ? 'admin-btn-danger' : 'admin-btn-danger-outline'}`} 
                    onClick={() => handleImmediateDelete(item.id, stateSetter)}
                  >
                    {deletingId === item.id ? (
                      <span style={{ fontSize:'12px', padding:'0 2px' }}>Confirm?</span>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };


  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Manage Categories</h1>
        <p>Add, edit, or remove recipe categories seamlessly</p>
      </div>

      <div className="categories-grid">
        {/* Cuisine Types */}
        <div className="admin-card category-list-card">
          <div className="category-header">
            <h2>Cuisine Types</h2>
            <button className="admin-btn admin-btn-primary" onClick={() => startAdding('Cuisine')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px'}}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Add Cuisine
            </button>
          </div>
          {renderCategoryList(cuisines, 'Cuisine', setCuisines)}
        </div>

        {/* Meal Types */}
        <div className="admin-card category-list-card">
          <div className="category-header">
            <h2>Meal Types</h2>
            <button className="admin-btn admin-btn-primary" onClick={() => startAdding('Meal Type')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px'}}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Add Meal Type
            </button>
          </div>
          {renderCategoryList(mealTypes, 'Meal Type', setMealTypes)}
        </div>
      </div>

      <div className="category-tips-box">
        <h3 className="tips-title">💡 Category Management Tips</h3>
        <ul>
          <li>Keep category names clear and specific</li>
          <li>Avoid duplicate or very similar categories</li>
          <li>Check recipe count before deleting categories</li>
          <li>Deleted categories mark recipes as "Uncategorized"</li>
          <li>Categories appear in filters and search dropdowns</li>
        </ul>
      </div>

      <div className="admin-system-behavior">
        <h3>SYSTEM BEHAVIOR</h3>
        <ul>
          <li>Categories used for recipe classification and filtering</li>
          <li>Add: Creates new category inline</li>
          <li>Edit: Renames category across all existing recipes directly in the list</li>
          <li>Delete: Double-click confirmation system replaces risky pop-ups</li>
          <li>Validation prevents empty category names</li>
        </ul>
      </div>

    </div>
  );
}
