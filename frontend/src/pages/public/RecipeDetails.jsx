import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./recipeDetails.css";

const recipeDetailsMap = {
  1: {
    id: 1,
    title: "Spaghetti Carbonara",
    cuisine: "Italian",
    time: 30,
    calories: 650,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      { name: "Spaghetti", amount: "400g" },
      { name: "Eggs", amount: "4 large" },
      { name: "Parmesan cheese", amount: "100g" },
      { name: "Pancetta", amount: "200g" },
      { name: "Black pepper", amount: "2 tsp" },
      { name: "Salt", amount: "to taste" },
    ],
    steps: [
      "Bring a large pot of salted water to a boil. Add spaghetti and cook according to package directions.",
      "While pasta cooks, beat eggs in a bowl and mix in grated Parmesan cheese.",
      "Cook pancetta in a large skillet over medium heat until crispy.",
      "Drain pasta, reserving 1 cup of pasta water. Add hot pasta to the skillet with pancetta.",
      "Remove from heat and quickly stir in egg mixture, adding pasta water as needed.",
      "Season with black pepper and serve immediately with extra Parmesan.",
    ],
  },
  2: {
    id: 2,
    title: "Chicken Teriyaki Bowl",
    cuisine: "Japanese",
    time: 25,
    calories: 480,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      { name: "Chicken breast", amount: "300g" },
      { name: "Soy sauce", amount: "4 tbsp" },
      { name: "Rice", amount: "2 cups cooked" },
      { name: "Broccoli", amount: "1 cup" },
      { name: "Carrots", amount: "1 cup" },
    ],
    steps: [
      "Cook the chicken in a skillet until browned.",
      "Add soy sauce and let it reduce into a glossy glaze.",
      "Steam the vegetables until just tender.",
      "Serve over warm rice and finish with sesame seeds.",
    ],
  },
  3: {
    id: 3,
    title: "Greek Salad",
    cuisine: "Mediterranean",
    time: 15,
    calories: 220,
    servings: 2,
    difficulty: "Easy",
    ingredients: [
      { name: "Cucumber", amount: "1 large" },
      { name: "Tomatoes", amount: "2 medium" },
      { name: "Red onion", amount: "1/2 small" },
      { name: "Olives", amount: "1/2 cup" },
      { name: "Feta cheese", amount: "100g" },
    ],
    steps: [
      "Chop the vegetables into bite-size pieces.",
      "Whisk olive oil with salt and pepper.",
      "Toss the vegetables with olives and dressing.",
      "Top with feta and serve immediately.",
    ],
  },
  4: {
    id: 4,
    title: "Beef Tacos",
    cuisine: "Mexican",
    time: 20,
    calories: 520,
    servings: 3,
    difficulty: "Easy",
    ingredients: [
      { name: "Ground beef", amount: "400g" },
      { name: "Taco shells", amount: "6" },
      { name: "Lettuce", amount: "1 cup shredded" },
      { name: "Tomatoes", amount: "1 cup diced" },
      { name: "Cheddar cheese", amount: "1/2 cup" },
    ],
    steps: [
      "Brown the ground beef in a skillet.",
      "Stir in seasoning with a splash of water.",
      "Warm the taco shells until crisp.",
      "Fill shells with beef and toppings.",
    ],
  },
  5: {
    id: 5,
    title: "Thai Green Curry",
    cuisine: "Thai",
    time: 35,
    calories: 580,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      { name: "Green curry paste", amount: "3 tbsp" },
      { name: "Coconut milk", amount: "2 cans" },
      { name: "Chicken thighs", amount: "400g" },
      { name: "Bell peppers", amount: "2" },
      { name: "Thai basil", amount: "1 handful" },
    ],
    steps: [
      "Fry the curry paste until fragrant.",
      "Add coconut milk and bring to a gentle simmer.",
      "Cook the chicken and vegetables until tender.",
      "Season and finish with fresh basil.",
    ],
  },
  10: {
    id: 10,
    title: "Homemade Pizza",
    cuisine: "Italian",
    time: 45,
    calories: 720,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      { name: "Pizza dough", amount: "1 ball" },
      { name: "Tomato sauce", amount: "1/2 cup" },
      { name: "Mozzarella", amount: "200g" },
      { name: "Basil", amount: "1 handful" },
    ],
    steps: [
      "Stretch the dough on a floured surface.",
      "Spread sauce and add cheese evenly.",
      "Bake until the crust is golden and crisp.",
      "Top with basil, slice, and serve hot.",
    ],
  },
  11: {
    id: 11,
    title: "Chicken Stir Fry",
    cuisine: "Asian",
    time: 25,
    calories: 430,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Chicken breast", amount: "400g" },
      { name: "Bell peppers", amount: "2" },
      { name: "Onions", amount: "1 medium" },
      { name: "Garlic", amount: "3 cloves" },
      { name: "Soy sauce", amount: "3 tbsp" },
    ],
    steps: [
      "Slice the chicken and vegetables into even strips.",
      "Sear the chicken in a hot pan until nearly cooked through.",
      "Add vegetables, garlic, and ginger, then stir fry until tender-crisp.",
      "Finish with soy sauce and serve over rice.",
    ],
  },
  12: {
    id: 12,
    title: "Chicken Fried Rice",
    cuisine: "Asian",
    time: 30,
    calories: 500,
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Chicken breast", amount: "300g" },
      { name: "Rice", amount: "3 cups cooked" },
      { name: "Onions", amount: "1 small" },
      { name: "Garlic", amount: "2 cloves" },
      { name: "Eggs", amount: "2" },
    ],
    steps: [
      "Cook the chicken pieces until lightly browned.",
      "Scramble the eggs and set them aside.",
      "Saute onions, garlic, and vegetables until fragrant.",
      "Add rice, chicken, and soy sauce, tossing until evenly coated.",
      "Fold the eggs back in and finish with green onions.",
    ],
  },
};

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
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const [stateView, setStateView] = useState("guest");
  const recipe = recipeDetailsMap[recipeId] ?? recipeDetailsMap[1];

  const missingIngredients = stateView === "missing";
  const isLoggedIn = stateView === "logged-in" || stateView === "missing";
  const availableIngredientName = recipe.ingredients[recipe.ingredients.length - 1]?.name;

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
              <span>{`[Recipe Image: ${recipe.title}]`}</span>
            </div>

            <header className="recipe-header">
              <h1>{recipe.title}</h1>
              <div className="recipe-meta-row">
                <span className="recipe-meta-item">
                  <InfoIcon type="time" />
                  {recipe.time} min
                </span>
                <span className="recipe-meta-item">
                  <InfoIcon type="servings" />
                  {`${recipe.servings} servings`}
                </span>
                <span className="recipe-meta-chip">{recipe.cuisine}</span>
                <span className="recipe-meta-text">{`${recipe.calories} cal`}</span>
                <span className="recipe-meta-chip">{recipe.difficulty}</span>
              </div>
            </header>

            <div className="recipe-action-row">
              <button type="button" className="recipe-action-button recipe-action-secondary">
                <HeartIcon />
                Add to Favorites
              </button>
              <button
                type="button"
                className="recipe-action-button recipe-action-primary"
                onClick={() => navigate(`/recipes/${recipe.id}/cooking-flow`)}
              >
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
                {recipe.steps.map((step, index) => (
                  <li key={`${recipe.id}-step-${index + 1}`}>
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
              {recipe.ingredients.map((ingredient) => (
                <li
                  key={ingredient.name}
                  className={
                    missingIngredients && ingredient.name !== availableIngredientName
                      ? "is-missing"
                      : ""
                  }
                >
                  <div>
                    <strong>{ingredient.name}</strong>
                    <span>{ingredient.amount}</span>
                  </div>
                  {missingIngredients && ingredient.name !== availableIngredientName && (
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
