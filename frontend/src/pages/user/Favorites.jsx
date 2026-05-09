import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./favorites.css";

const favoriteRecipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    cuisine: "Italian",
    time: 30,
    calories: 650,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Chicken Teriyaki Bowl",
    cuisine: "Japanese",
    time: 25,
    calories: 480,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Greek Salad",
    cuisine: "Mediterranean",
    time: 15,
    calories: 220,
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Beef Tacos",
    cuisine: "Mexican",
    time: 20,
    calories: 520,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    title: "Thai Green Curry",
    cuisine: "Thai",
    time: 35,
    calories: 590,
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
  },
  {
    id: 10,
    title: "Homemade Pizza",
    cuisine: "Italian",
    time: 45,
    calories: 720,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
  },
];

function Favorites() {
  const navigate = useNavigate();
  const [showFavorites, setShowFavorites] = useState(true);

  function openRecipeDetails(recipeId) {
    navigate(`/recipes/${recipeId}`);
  }

  return (
    <section className="favorites-page">
      <div className="favorites-shell">
        <div className="favorites-state-controls">
          <p>WIREFRAME STATE CONTROLS</p>
          <div className="favorites-state-buttons">
            <button
              type="button"
              className={`favorites-state-button ${
                showFavorites ? "favorites-state-button-active" : ""
              }`}
              onClick={() => setShowFavorites(true)}
            >
              With Favorites
            </button>
            <button
              type="button"
              className={`favorites-state-button ${
                !showFavorites ? "favorites-state-button-active" : ""
              }`}
              onClick={() => setShowFavorites(false)}
            >
              Empty
            </button>
          </div>
        </div>

        <header className="favorites-header">
          <h1>My Favorites</h1>
          <p>
            You have{" "}
            <strong>{showFavorites ? favoriteRecipes.length : 0} saved recipes</strong>
          </p>
        </header>

        {showFavorites ? (
          <div className="favorites-grid">
            {favoriteRecipes.map((recipe) => (
              <article
                className="favorites-card favorites-card-clickable"
                key={recipe.id}
                onClick={() => openRecipeDetails(recipe.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openRecipeDetails(recipe.id);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <button
                  type="button"
                  className="favorites-heart"
                  aria-label="Remove favorite"
                  onClick={(event) => event.stopPropagation()}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 21.35 10.55 20C5.4 15.24 2 12.09 2 8.25 2 5.1 4.42 2.75 7.5 2.75c1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.35 5.5 5.5 0 3.84-3.4 6.99-8.55 11.76L12 21.35Z" />
                  </svg>
                </button>
                <div className="favorites-card-image">
                  <img src={recipe.image} alt={recipe.title} />
                </div>
                <div className="favorites-card-body">
                  <h3>{recipe.title}</h3>
                  <div className="favorites-card-meta">
                    <span className="favorites-card-tag">{recipe.cuisine}</span>
                    <span>{recipe.time} min</span>
                    <span>{recipe.calories} cal</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="favorites-empty-state">
            <h2>No favorites yet</h2>
            <p>Recipes you save will show up here for quick access later.</p>
          </div>
        )}

        <section className="favorites-notes">
          <h2>SYSTEM BEHAVIOR</h2>
          <ul>
            <li>Favorites fetched from database on page load</li>
            <li>Remove button appears on hover for each recipe card</li>
            <li>Confirmation modal prevents accidental removal</li>
            <li>Favorites synced across all user devices</li>
            <li>Empty state encourages browsing recipes</li>
            <li>Grid layout adapts for all devices</li>
            <li>Heart icon indicates saved status</li>
          </ul>
        </section>
      </div>
    </section>
  );
}

export default Favorites;
