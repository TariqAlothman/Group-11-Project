import { useState } from "react";
import "./recipeDetails.css";

const ingredients = [
  { name: "Spaghetti", amount: "400g" },
  { name: "Eggs", amount: "4 large" },
  { name: "Parmesan cheese", amount: "100g" },
  { name: "Pancetta", amount: "200g" },
  { name: "Black pepper", amount: "2 tsp" },
  { name: "Salt", amount: "to taste" },
];

const instructions = [
  "Bring a large pot of salted water to a boil. Add spaghetti and cook according to package directions.",
  "While pasta cooks, beat eggs in a bowl and mix in grated Parmesan cheese.",
  "Cook pancetta in a large skillet over medium heat until crispy.",
  "Drain pasta, reserving 1 cup of pasta water. Add hot pasta to the skillet with pancetta.",
  "Remove from heat and quickly stir in egg mixture, adding pasta water as needed.",
  "Season with black pepper and serve immediately with extra Parmesan.",
];

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21.35 10.55 20C5.4 15.24 2 12.09 2 8.25 2 5.1 4.42 2.75 7.5 2.75c1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.35 5.5 5.5 0 3.84-3.4 6.99-8.55 11.76L12 21.35Z" />
    </svg>
  );
}

function PotIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 10h10a3 3 0 0 1 3 3v5H4v-5a3 3 0 0 1 3-3Z" />
      <path d="M9 6h6" />
      <path d="M8 18v2" />
      <path d="M16 18v2" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 7H7" />
      <circle cx="10" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </svg>
  );
}

function InfoIcon({ type }) {
  if (type === "time") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v6l4 2" />
      </svg>
    );
  }

  if (type === "servings") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="9.5" cy="8" r="4" />
        <path d="M20 8v6" />
        <path d="M17 11h6" />
      </svg>
    );
  }

  return null;
}

function RecipeDetails() {
  const [stateView, setStateView] = useState("guest");

  const missingIngredients = stateView === "missing";
  const isLoggedIn = stateView === "logged-in" || stateView === "missing";

  return (
    <section className="recipe-details-page">
      <div className="recipe-details-shell">
        <div className="recipe-state-controls">
          <p>WIREFRAME STATE CONTROLS</p>
          <div className="recipe-state-button-row">
            <button
              type="button"
              className={`recipe-state-button ${
                stateView === "guest" ? "recipe-state-button-active" : ""
              }`}
              onClick={() => setStateView("guest")}
            >
              Guest View
            </button>
            <button
              type="button"
              className={`recipe-state-button ${
                stateView === "logged-in" ? "recipe-state-button-active" : ""
              }`}
              onClick={() => setStateView("logged-in")}
            >
              Logged In
            </button>
            <button
              type="button"
              className={`recipe-state-button ${
                stateView === "missing" ? "recipe-state-button-active" : ""
              }`}
              onClick={() => setStateView("missing")}
            >
              Missing Ingredients
            </button>
          </div>
        </div>

        <div className="recipe-top-layout">
          <div className="recipe-main-column">
            <div className="recipe-image-panel">
              <span>[Recipe Image: Spaghetti Carbonara]</span>
            </div>

            <header className="recipe-header">
              <h1>Spaghetti Carbonara</h1>
              <div className="recipe-meta-row">
                <span className="recipe-meta-item">
                  <InfoIcon type="time" />
                  30 min
                </span>
                <span className="recipe-meta-item">
                  <InfoIcon type="servings" />4 servings
                </span>
                <span className="recipe-meta-chip">Italian</span>
                <span className="recipe-meta-text">650 cal</span>
                <span className="recipe-meta-chip">Medium</span>
              </div>
            </header>

            <div className="recipe-action-row">
              <button type="button" className="recipe-action-button recipe-action-secondary">
                <HeartIcon />
                Add to Favorites
              </button>
              <button type="button" className="recipe-action-button recipe-action-primary">
                <PotIcon />
                Start Cooking
              </button>
              <button type="button" className="recipe-action-button recipe-action-secondary">
                <CartIcon />
                Generate Shopping List
              </button>
            </div>

            {missingIngredients && (
              <div className="recipe-banner">
                Some ingredients are missing from your pantry. Generate a shopping list to fill the gaps.
              </div>
            )}

            {!isLoggedIn && (
              <div className="recipe-banner recipe-banner-neutral">
                Log in to save this recipe to favorites and sync your cooking progress.
              </div>
            )}

            <section className="recipe-instructions-card">
              <h2>Instructions</h2>
              <ol className="recipe-instructions-list">
                {instructions.map((step, index) => (
                  <li key={step}>
                    <span className="recipe-step-number">{index + 1}</span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <aside className="recipe-ingredients-card">
            <h2>Ingredients</h2>
            <ul>
              {ingredients.map((ingredient) => (
                <li
                  key={ingredient.name}
                  className={missingIngredients && ingredient.name !== "Salt" ? "is-missing" : ""}
                >
                  <div>
                    <strong>{ingredient.name}</strong>
                    <span>{ingredient.amount}</span>
                  </div>
                  {missingIngredients && ingredient.name !== "Salt" && (
                    <em>Missing</em>
                  )}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <section className="recipe-notes-card">
          <h2>SYSTEM BEHAVIOR</h2>
          <ul>
            <li>Recipe data fetched from API using recipe ID from URL</li>
            <li>Guest users see login prompt when clicking "Add to Favorites"</li>
            <li>Instructions and ingredients rendered from recipe model</li>
            <li>Start Cooking redirects to step-by-step cooking mode</li>
            <li>Generate Shopping List adds missing ingredients to user's list</li>
            <li>Ingredient checkboxes for manual tracking later saved in session</li>
            <li>Missing ingredients highlighted when coming from Ready-to-Cook mode</li>
          </ul>
        </section>
      </div>
    </section>
  );
}

export default RecipeDetails;
