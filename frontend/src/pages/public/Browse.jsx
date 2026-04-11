import { useState } from "react";
import "./browse.css";

const cuisineTypes = [
  "Italian",
  "Japanese",
  "Mediterranean",
  "Mexican",
  "Thai",
  "American",
];

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

const recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    cuisine: "Italian",
    mealType: "Dinner",
    time: 30,
    calories: 650,
  },
  {
    id: 2,
    title: "Chicken Teriyaki Bowl",
    cuisine: "Japanese",
    mealType: "Lunch",
    time: 25,
    calories: 480,
  },
  {
    id: 3,
    title: "Greek Salad",
    cuisine: "Mediterranean",
    mealType: "Lunch",
    time: 15,
    calories: 220,
  },
  {
    id: 4,
    title: "Beef Tacos",
    cuisine: "Mexican",
    mealType: "Dinner",
    time: 20,
    calories: 520,
  },
  {
    id: 5,
    title: "Thai Green Curry",
    cuisine: "Thai",
    mealType: "Dinner",
    time: 35,
    calories: 580,
  },
  {
    id: 6,
    title: "Caesar Salad",
    cuisine: "American",
    mealType: "Lunch",
    time: 10,
    calories: 320,
  },
  {
    id: 7,
    title: "Pancakes",
    cuisine: "American",
    mealType: "Breakfast",
    time: 18,
    calories: 410,
  },
  {
    id: 8,
    title: "Sushi Roll Plate",
    cuisine: "Japanese",
    mealType: "Dinner",
    time: 40,
    calories: 360,
  },
  {
    id: 9,
    title: "Bruschetta",
    cuisine: "Italian",
    mealType: "Snack",
    time: 12,
    calories: 190,
  },
];

const defaultDraftFilters = {
  cuisine: "All",
  mealType: "All",
  maxTime: 120,
  maxCalories: 1000,
};

const recipesPerPage = 6;

function FilterIcon() {
  return (
    <svg
      aria-hidden="true"
      className="browse-filters-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16l-6.3 7.2v4.9l-3.4 1.9v-6.8L4 6z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="browse-search-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

function Browse() {
  const [searchTerm, setSearchTerm] = useState("");
  const [draftFilters, setDraftFilters] = useState(defaultDraftFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultDraftFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      searchTerm.trim() === "" ||
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.mealType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCuisine =
      appliedFilters.cuisine === "All" || recipe.cuisine === appliedFilters.cuisine;

    const matchesMealType =
      appliedFilters.mealType === "All" || recipe.mealType === appliedFilters.mealType;

    const matchesTime = recipe.time <= appliedFilters.maxTime;
    const matchesCalories = recipe.calories <= appliedFilters.maxCalories;

    return (
      matchesSearch &&
      matchesCuisine &&
      matchesMealType &&
      matchesTime &&
      matchesCalories
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredRecipes.length / recipesPerPage));
  const currentPageSafe = Math.min(currentPage, totalPages);
  const pageRecipes = filteredRecipes.slice(
    (currentPageSafe - 1) * recipesPerPage,
    currentPageSafe * recipesPerPage
  );

  function updateDraftFilter(name, value) {
    setDraftFilters((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function applyFilters() {
    setAppliedFilters(draftFilters);
    setCurrentPage(1);
  }

  function clearFilters() {
    setSearchTerm("");
    setDraftFilters(defaultDraftFilters);
    setAppliedFilters(defaultDraftFilters);
    setCurrentPage(1);
  }

  function goToPage(page) {
    setCurrentPage(page);
  }

  function goToPreviousPage() {
    if (currentPageSafe > 1) {
      setCurrentPage(currentPageSafe - 1);
    }
  }

  function goToNextPage() {
    if (currentPageSafe < totalPages) {
      setCurrentPage(currentPageSafe + 1);
    }
  }

  return (
    <section className="browse-page">
      <div className="browse-layout">
        <aside className="browse-sidebar">
          <div className="browse-sidebar-title">
            <FilterIcon />
            <h2>Filters</h2>
          </div>

          <div className="browse-filter-group">
            <h3>Cuisine Type</h3>
            <div className="browse-filter-list browse-filter-button-list">
              <button
                type="button"
                className={`browse-filter-button ${
                  draftFilters.cuisine === "All" ? "browse-filter-button-active" : ""
                }`}
                onClick={() => updateDraftFilter("cuisine", "All")}
              >
                All
              </button>
              {cuisineTypes.map((cuisine) => (
                <button
                  key={cuisine}
                  type="button"
                  className={`browse-filter-button ${
                    draftFilters.cuisine === cuisine ? "browse-filter-button-active" : ""
                  }`}
                  onClick={() => updateDraftFilter("cuisine", cuisine)}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          <div className="browse-filter-group">
            <h3>Meal Type</h3>
            <select
              className="browse-select"
              value={draftFilters.mealType}
              onChange={(event) => updateDraftFilter("mealType", event.target.value)}
            >
              <option value="All">All meal types</option>
              {mealTypes.map((mealType) => (
                <option key={mealType} value={mealType}>
                  {mealType}
                </option>
              ))}
            </select>
          </div>

          <div className="browse-filter-group">
            <div className="browse-filter-heading-row">
              <h3>Cooking Time</h3>
              <span>{draftFilters.maxTime} min</span>
            </div>
            <div className="browse-range-labels">
              <span>0 min</span>
              <span>120 min</span>
            </div>
            <input
              className="browse-range-input"
              type="range"
              min="0"
              max="120"
              step="5"
              value={draftFilters.maxTime}
              onChange={(event) => updateDraftFilter("maxTime", Number(event.target.value))}
            />
          </div>

          <div className="browse-filter-group">
            <div className="browse-filter-heading-row">
              <h3>Calories</h3>
              <span>{draftFilters.maxCalories} cal</span>
            </div>
            <div className="browse-range-labels">
              <span>0 cal</span>
              <span>1000 cal</span>
            </div>
            <input
              className="browse-range-input"
              type="range"
              min="0"
              max="1000"
              step="25"
              value={draftFilters.maxCalories}
              onChange={(event) =>
                updateDraftFilter("maxCalories", Number(event.target.value))
              }
            />
          </div>

          <button type="button" className="browse-apply-button" onClick={applyFilters}>
            Apply Filters
          </button>

          <button type="button" className="browse-clear-button" onClick={clearFilters}>
            Clear All
          </button>
        </aside>

        <div className="browse-content">
          <label className="browse-search" htmlFor="browse-search-input">
            <SearchIcon />
            <input
              id="browse-search-input"
              type="text"
              placeholder="Search recipes by name, ingredient, or cuisine..."
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setCurrentPage(1);
              }}
            />
          </label>

          <p className="browse-results-count">
            Showing <strong>{filteredRecipes.length} recipes</strong>
          </p>

          {pageRecipes.length > 0 ? (
            <div className="browse-card-grid">
              {pageRecipes.map((recipe) => (
                <article className="browse-card" key={recipe.id}>
                  <div className="browse-card-image">[Recipe Image]</div>
                  <div className="browse-card-body">
                    <h3>{recipe.title}</h3>
                    <div className="browse-card-meta">
                      <span className="browse-card-tag">{recipe.cuisine}</span>
                      <span className="browse-card-tag">{recipe.mealType}</span>
                      <span>{recipe.time} min</span>
                      <span>{recipe.calories} cal</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="browse-empty-state">
              <h3>No recipes match these filters.</h3>
              <p>Try clearing some filters or broadening your search.</p>
            </div>
          )}

          <nav className="browse-pagination" aria-label="Browse pagination">
            <button
              type="button"
              className="browse-page-button browse-page-arrow"
              onClick={goToPreviousPage}
              disabled={currentPageSafe === 1}
            >
              {"<"}
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                type="button"
                className={`browse-page-button ${
                  page === currentPageSafe ? "browse-page-button-active" : ""
                }`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              className="browse-page-button browse-page-arrow"
              onClick={goToNextPage}
              disabled={currentPageSafe === totalPages}
            >
              {">"}
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
}

export default Browse;
