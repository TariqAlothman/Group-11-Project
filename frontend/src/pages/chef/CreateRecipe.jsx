import { useNavigate } from "react-router-dom";

const validationChecklist = [
  "Recipe title",
  "Description",
  "Cuisine type",
  "Meal type",
  "Cooking time",
  "Serving size",
  "At least 2 ingredients",
  "At least 1 step",
  "Recipe image uploaded",
];

const importantNotes = [
  "Drafts auto-save every 30 seconds",
  "One photo upload takes up to 2 MB",
  "Review can take up to 2 days",
  "Provide clear, tested instructions",
];

const systemBehavior = [
  "Saved as draft in under 30 seconds",
  "Validation runs before submission",
  "Missing fields stay highlighted until fixed",
  "Chef can append ingredient and step rows",
  "Image upload accepts JPG, PNG, SVG, or WebP",
  "Draft submission warns about unsaved changes",
  "Rejected recipes can be edited and resubmitted",
];

function CreateRecipe() {
  const navigate = useNavigate();

  return (
    <main className="chef-page">
      <section className="chef-shell">
        <header className="chef-header chef-header-row">
          <div>
            <p className="chef-eyebrow">Create Recipe</p>
            <h1>Create New Recipe</h1>
            <p className="chef-subtitle">Fill in the details to prepare your recipe submission.</p>
          </div>

          <div className="chef-header-actions">
            <button type="button" className="chef-secondary-button">
              Save Draft
            </button>
            <button
              type="button"
              className="chef-primary-button"
              onClick={() => navigate("/chef/submissions")}
            >
              Submit for Review
            </button>
          </div>
        </header>

        <section className="chef-form-layout">
          <div className="chef-form-main">
            <article className="chef-card">
              <div className="chef-card-header">
                <h2>Basic Information</h2>
              </div>

              <div className="chef-form-grid">
                <label className="chef-field chef-field-full">
                  <span>Recipe Title *</span>
                  <input type="text" placeholder="e.g. Classic Spaghetti Carbonara" />
                </label>

                <label className="chef-field chef-field-full">
                  <span>Description *</span>
                  <textarea
                    rows="4"
                    placeholder="Brief description of your recipe..."
                  />
                </label>

                <label className="chef-field">
                  <span>Cuisine *</span>
                  <input type="text" placeholder="Italian" />
                </label>

                <label className="chef-field">
                  <span>Meal Type *</span>
                  <input type="text" placeholder="Main Course" />
                </label>

                <label className="chef-field">
                  <span>Cooking Time (mins) *</span>
                  <input type="text" placeholder="30" />
                </label>

                <label className="chef-field">
                  <span>Servings *</span>
                  <input type="text" placeholder="4" />
                </label>

                <label className="chef-field">
                  <span>Calories (per serving)</span>
                  <input type="text" placeholder="450" />
                </label>
              </div>
            </article>

            <article className="chef-card">
              <div className="chef-card-header">
                <h2>Ingredients</h2>
                <button type="button" className="chef-inline-button">
                  + Add Ingredient
                </button>
              </div>

              <div className="chef-dynamic-row">
                <span className="chef-step-index">1</span>
                <input type="text" placeholder="Ingredient name" />
                <input type="text" placeholder="Amount" />
                <input type="text" placeholder="Unit" />
              </div>
            </article>

            <article className="chef-card">
              <div className="chef-card-header">
                <h2>Cooking Steps</h2>
                <button type="button" className="chef-inline-button">
                  + Add Step
                </button>
              </div>

              <div className="chef-dynamic-row chef-step-row">
                <span className="chef-step-index">1</span>
                <textarea rows="3" placeholder="Describe this step in detail..." />
              </div>
            </article>

            <article className="chef-card">
              <div className="chef-card-header">
                <h2>Recipe Image</h2>
              </div>

              <div className="chef-upload-box">
                <div className="chef-upload-icon">↑</div>
                <strong>Drag &amp; drop or click to upload</strong>
                <span>PNG, JPG, SVG, or WebP. Recommended: 1200 x 800.</span>
                <button type="button" className="chef-inline-button">
                  Choose File
                </button>
              </div>
            </article>
          </div>

          <aside className="chef-form-side">
            <article className="chef-card chef-info-panel chef-tone-info">
              <h2>Validation Checklist</h2>
              <ul className="chef-mini-list">
                {validationChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="chef-card chef-info-panel chef-tone-warning">
              <h2>Important Notes</h2>
              <ul className="chef-mini-list">
                {importantNotes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </aside>
        </section>

        <section className="chef-card chef-system-note">
          <h2>System Behavior</h2>
          <ul className="chef-mini-list">
            {systemBehavior.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}

export default CreateRecipe;
