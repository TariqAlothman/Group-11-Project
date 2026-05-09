import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./readyToCook.css";

const initialIngredients = [
  "Chicken breast",
  "Rice",
  "Onions",
  "Garlic",
  "Bell peppers",
];

const matches = [
  {
    id: 11,
    title: "Chicken Stir Fry",
    cuisine: "Asian",
    time: 25,
    matched: 4,
    total: 8,
    missing: 4,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop",
  },
  {
    id: 12,
    title: "Chicken Fried Rice",
    cuisine: "Asian",
    time: 30,
    matched: 5,
    total: 9,
    missing: 4,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop",
  },
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 4h11l3 3v13H5z" />
      <path d="M8 4v5h8V4" />
      <path d="M9 18h6" />
    </svg>
  );
}

function ReadyToCook() {
  const navigate = useNavigate();
  const [stateView, setStateView] = useState("with-ingredients");
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState(initialIngredients);

  const isEmpty = stateView === "empty";
  const noResults = stateView === "no-results";
  const saveSuccess = stateView === "save-success";
  const visibleIngredients = isEmpty ? [] : ingredients;
  const visibleMatches = isEmpty || noResults ? [] : matches;

  function addIngredient() {
    const trimmed = ingredientInput.trim();

    if (!trimmed) {
      return;
    }

    setIngredients((current) => [...current, trimmed]);
    setIngredientInput("");
  }

  function removeIngredient(ingredientToRemove) {
    setIngredients((current) => current.filter((ingredient) => ingredient !== ingredientToRemove));
  }

  function openRecipeDetails(recipeId) {
    navigate(`/recipes/${recipeId}`);
  }

  return (
    <section className="ready-page">
      <div className="ready-shell">
        <div className="ready-state-controls">
          <p>WIREFRAME STATE CONTROLS</p>
          <div className="ready-state-buttons">
            <button
              type="button"
              className={`ready-state-button ${isEmpty ? "ready-state-button-active" : ""}`}
              onClick={() => setStateView("empty")}
            >
              Empty
            </button>
            <button
              type="button"
              className={`ready-state-button ${
                stateView === "with-ingredients" ? "ready-state-button-active" : ""
              }`}
              onClick={() => setStateView("with-ingredients")}
            >
              With Ingredients
            </button>
            <button
              type="button"
              className={`ready-state-button ${
                noResults ? "ready-state-button-active" : ""
              }`}
              onClick={() => setStateView("no-results")}
            >
              No Results
            </button>
            <button
              type="button"
              className={`ready-state-button ${
                saveSuccess ? "ready-state-button-active" : ""
              }`}
              onClick={() => setStateView("save-success")}
            >
              Save Success
            </button>
          </div>
        </div>

        <div className="ready-layout">
          <aside className="ready-ingredients-card">
            <div className="ready-card-header">
              <div>
                <h1>My Ingredients</h1>
                <p>Your saved ingredient list is synced across devices</p>
              </div>
              <button type="button" className="ready-save-button">
                <SaveIcon />
                Save List
              </button>
            </div>

            <div className="ready-add-section">
              <h2>Add Ingredient</h2>
              <div className="ready-add-row">
                <input
                  type="text"
                  placeholder="e.g., Chicken, Tomatoes..."
                  value={ingredientInput}
                  onChange={(event) => setIngredientInput(event.target.value)}
                />
                <button type="button" className="ready-add-button" onClick={addIngredient}>
                  +
                </button>
              </div>
            </div>

            <div className="ready-saved-section">
              <div className="ready-saved-header">
                <h2>Saved ({visibleIngredients.length})</h2>
                <button type="button" className="ready-clear-link">
                  Clear All
                </button>
              </div>

              <div className="ready-ingredient-list">
                {visibleIngredients.length > 0 ? (
                  visibleIngredients.map((ingredient, index) => (
                    <div
                      key={`${ingredient}-${index}`}
                      className={`ready-ingredient-chip ${
                        ingredient === "Garlic" ? "is-muted" : ""
                      }`}
                      >
                        <span>{ingredient}</span>
                        <button type="button" onClick={() => removeIngredient(ingredient)}>
                          x
                        </button>
                      </div>
                  ))
                ) : (
                  <div className="ready-empty-copy">No saved ingredients yet.</div>
                )}
              </div>

              <p className="ready-helper-text">Check items you currently have available</p>
            </div>

            <button type="button" className="ready-find-button">
              <SearchIcon />
              Find Recipes
            </button>

            <p className="ready-footer-count">{visibleIngredients.length} available ingredients</p>

            {saveSuccess && (
              <div className="ready-success-banner">
                Ingredient list saved successfully.
              </div>
            )}
          </aside>

          <section className="ready-results-column">
            <h1>Matching Recipes</h1>
            <p className="ready-results-copy">
              Found {visibleMatches.length} recipes using your available ingredients
            </p>

            {visibleMatches.length > 0 ? (
              <div className="ready-results-list">
                {visibleMatches.map((recipe) => {
                  const progress = (recipe.matched / recipe.total) * 100;

                  return (
                    <article
                      className="ready-result-card ready-result-card-clickable"
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
                      <div className="ready-result-image">
                        <img src={recipe.image} alt={recipe.title} />
                      </div>
                      <div className="ready-result-content">
                        <div className="ready-result-heading">
                          <h2>{recipe.title}</h2>
                          <div className="ready-result-meta">
                            <span className="ready-result-tag">{recipe.cuisine}</span>
                            <span>{recipe.time} min</span>
                          </div>
                        </div>

                        <div className="ready-progress-row">
                          <div className="ready-progress-track">
                            <div
                              className="ready-progress-fill"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <strong>
                            {recipe.matched}/{recipe.total} ingredients
                          </strong>
                        </div>

                        <p>Missing {recipe.missing} ingredients</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="ready-empty-results">
                <h2>{isEmpty ? "Add ingredients to get started" : "No matching recipes found"}</h2>
                <p>
                  {isEmpty
                    ? "Build your ingredient list and we will suggest recipes you can make."
                    : "Try adding more ingredients or broadening your available pantry items."}
                </p>
              </div>
            )}
          </section>
        </div>

        <section className="ready-notes-card">
          <h2>SYSTEM BEHAVIOR</h2>
          <ul>
            <li>Ingredient list stored in database and synced across devices</li>
            <li>Checkbox toggles ingredient availability without removing list items</li>
            <li>Auto-save option available after any change</li>
            <li>Recipe matching uses only available ingredients</li>
            <li>Save button shows success feedback notification</li>
            <li>Ingredients can be marked unavailable without deletion</li>
            <li>Missing ingredients automatically added to shopping list option</li>
          </ul>
        </section>
      </div>
    </section>
  );
}

export default ReadyToCook;
