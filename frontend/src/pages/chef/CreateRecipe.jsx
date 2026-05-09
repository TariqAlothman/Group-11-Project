import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./chefDashboard.css";


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
  const [ingredients, setIngredients] = useState([
    { id: 1, name: "", amount: "", unit: "" },
  ]);
  const [steps, setSteps] = useState([{ id: 1, instruction: "" }]);
  const fileInputRef = useRef(null);
  const [imageName, setImageName] = useState("");

  function addIngredient() {
    setIngredients((current) => [
      ...current,
      {
        id: current.length + 1,
        name: "",
        amount: "",
        unit: "",
      },
    ]);
  }

  function updateIngredient(id, field, value) {
    setIngredients((current) =>
      current.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
      )
    );
  }

  function addStep() {
    setSteps((current) => [
      ...current,
      {
        id: current.length + 1,
        instruction: "",
      },
    ]);
  }

  function updateStep(id, value) {
    setSteps((current) =>
      current.map((step) => (step.id === id ? { ...step, instruction: value } : step))
    );
  }

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
                  <input type="number" min="1" placeholder="30" />
                </label>

                <label className="chef-field">
                  <span>Servings *</span>
                  <input type="number" min="1" placeholder="4" />
                </label>

                <label className="chef-field">
                  <span>Calories (per serving)</span>
                  <input type="number" min="0" placeholder="450" />
                </label>
              </div>
            </article>

            <article className="chef-card">
              <div className="chef-card-header">
                <h2>Ingredients</h2>
                <button type="button" className="chef-inline-button" onClick={addIngredient}>
                  + Add Ingredient
                </button>
              </div>

              <div className="chef-dynamic-list">
                {ingredients.map((ingredient, index) => (
                  <div className="chef-dynamic-row" key={ingredient.id}>
                    <span className="chef-step-index">{index + 1}</span>
                    <input
                      type="text"
                      placeholder="Ingredient name"
                      value={ingredient.name}
                      onChange={(event) =>
                        updateIngredient(ingredient.id, "name", event.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Amount"
                      value={ingredient.amount}
                      onChange={(event) =>
                        updateIngredient(ingredient.id, "amount", event.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Unit"
                      value={ingredient.unit}
                      onChange={(event) =>
                        updateIngredient(ingredient.id, "unit", event.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </article>

            <article className="chef-card">
              <div className="chef-card-header">
                <h2>Cooking Steps</h2>
                <button type="button" className="chef-inline-button" onClick={addStep}>
                  + Add Step
                </button>
              </div>

              <div className="chef-dynamic-list">
                {steps.map((step, index) => (
                  <div className="chef-dynamic-row chef-step-row" key={step.id}>
                    <span className="chef-step-index">{index + 1}</span>
                    <textarea
                      rows="3"
                      placeholder="Describe this step in detail..."
                      value={step.instruction}
                      onChange={(event) => updateStep(step.id, event.target.value)}
                    />
                  </div>
                ))}
              </div>
            </article>

            <article className="chef-card">
              <div className="chef-card-header">
                <h2>Recipe Image</h2>
              </div>

              <div className="chef-upload-box" onClick={() => fileInputRef.current.click()} style={{ cursor: "pointer" }}>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: "none" }} 
                  accept="image/png, image/jpeg, image/svg+xml, image/webp"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImageName(e.target.files[0].name);
                    }
                  }}
                />
                <div className="chef-upload-icon">↑</div>
                <strong>Drag &amp; drop or click to upload</strong>
                <span>PNG, JPG, SVG, or WebP. Recommended: 1200 x 800.</span>
                {imageName ? (
                  <p style={{ marginTop: "10px", color: "var(--admin-success)", fontWeight: "bold" }}>Selected: {imageName}</p>
                ) : (
                  <button type="button" className="chef-inline-button" onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }}>
                    Choose File
                  </button>
                )}
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


      </section>
    </main>
  );
}

export default CreateRecipe;
