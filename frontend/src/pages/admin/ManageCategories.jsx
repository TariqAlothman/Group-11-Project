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

  const handleAdd = (type, setState) => {
    const name = window.prompt(`Enter new ${type} name:`);
    if (name) {
      setState(prev => [...prev, { id: Date.now(), name, recipes: 0 }]);
    }
  };

  const handleEdit = (id, type, state, setState) => {
    const item = state.find(i => i.id === id);
    const name = window.prompt(`Edit ${type} name:`, item.name);
    if (name) {
      setState(prev => prev.map(i => i.id === id ? { ...i, name } : i));
    }
  };

  const handleDelete = (id, setState) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setState(prev => prev.filter(i => i.id !== id));
    }
  };


  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Manage Categories</h1>
        <p>Add, edit, or remove recipe categories</p>
      </div>

      <div className="categories-grid">
        {/* Cuisine Types */}
        <div className="admin-card category-list-card">
          <div className="category-header">
            <h2>Cuisine Types</h2>
            <button className="admin-btn admin-btn-primary" onClick={() => handleAdd('Cuisine', setCuisines)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px'}}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Add Cuisine
            </button>
          </div>
          <div className="category-list">
            {cuisines.map(item => (
              <div key={item.id} className="category-item">
                <div className="category-info">
                  <strong>{item.name}</strong>
                  <span>{item.recipes} recipes</span>
                </div>
                <div className="category-actions">
                  <button className="admin-btn admin-btn-icon-only admin-btn-outline" onClick={() => handleEdit(item.id, 'Cuisine', cuisines, setCuisines)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                  </button>
                  <button className="admin-btn admin-btn-icon-only admin-btn-danger-outline" onClick={() => handleDelete(item.id, setCuisines)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meal Types */}
        <div className="admin-card category-list-card">
          <div className="category-header">
            <h2>Meal Types</h2>
            <button className="admin-btn admin-btn-primary" onClick={() => handleAdd('Meal Type', setMealTypes)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '6px'}}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Add Meal Type
            </button>
          </div>
          <div className="category-list">
            {mealTypes.map(item => (
              <div key={item.id} className="category-item">
                <div className="category-info">
                  <strong>{item.name}</strong>
                  <span>{item.recipes} recipes</span>
                </div>
                <div className="category-actions">
                  <button className="admin-btn admin-btn-icon-only admin-btn-outline" onClick={() => handleEdit(item.id, 'Meal Type', mealTypes, setMealTypes)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                  </button>
                  <button className="admin-btn admin-btn-icon-only admin-btn-danger-outline" onClick={() => handleDelete(item.id, setMealTypes)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
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
          <li>Add: Creates new category available immediately</li>
          <li>Edit: Renames category across all existing recipes</li>
          <li>Delete: Removes category, recipes marked "Uncategorized"</li>
          <li>Recipe count shows how many recipes use each category</li>
          <li>Categories appear in dropdown menus for chefs and filters</li>
          <li>Validation prevents empty category names</li>
          <li>All changes logged with admin user and timestamp</li>
        </ul>
      </div>

    </div>
  );
}
