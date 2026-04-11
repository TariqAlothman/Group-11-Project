import { useState } from "react";
import "./shoppingList.css";

const initialRecipeItems = [
  { id: 1, name: "Parmesan cheese", amount: "100g", source: "Spaghetti Carbonara", completed: true },
  { id: 2, name: "Pancetta", amount: "200g", source: "Spaghetti Carbonara", completed: false },
  { id: 3, name: "Soy sauce", amount: "3 tbsp", source: "Chicken Teriyaki", completed: false },
  { id: 4, name: "Ginger", amount: "1 tbsp", source: "Chicken Teriyaki", completed: false },
];

const initialCustomItems = [{ id: 5, name: "Tomatoes", amount: "4 large", completed: false }];

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="M7 7l1 12h8l1-12" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

function ShoppingList() {
  const [stateView, setStateView] = useState("with-items");
  const [itemName, setItemName] = useState("");
  const [itemAmount, setItemAmount] = useState("");
  const [recipeItems, setRecipeItems] = useState(initialRecipeItems);
  const [customItems, setCustomItems] = useState(initialCustomItems);

  const isEmpty = stateView === "empty";
  const generationSuccess = stateView === "generation-success";

  const visibleRecipeItems = isEmpty ? [] : recipeItems;
  const visibleCustomItems = isEmpty ? [] : customItems;
  const totalItems = visibleRecipeItems.length + visibleCustomItems.length;
  const completedItems = [...visibleRecipeItems, ...visibleCustomItems].filter(
    (item) => item.completed
  ).length;

  function removeItem(listType, itemId) {
    if (listType === "recipe") {
      setRecipeItems((current) => current.filter((item) => item.id !== itemId));
      return;
    }

    setCustomItems((current) => current.filter((item) => item.id !== itemId));
  }

  function toggleItem(listType, itemId) {
    const toggle = (items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );

    if (listType === "recipe") {
      setRecipeItems((current) => toggle(current));
      return;
    }

    setCustomItems((current) => toggle(current));
  }

  function addCustomItem() {
    const trimmedName = itemName.trim();
    const trimmedAmount = itemAmount.trim();

    if (!trimmedName) {
      return;
    }

    setCustomItems((current) => [
      ...current,
      {
        id: Date.now(),
        name: trimmedName,
        amount: trimmedAmount || "1 item",
        completed: false,
      },
    ]);
    setItemName("");
    setItemAmount("");
    setStateView("with-items");
  }

  function clearCompleted() {
    setRecipeItems((current) => current.filter((item) => !item.completed));
    setCustomItems((current) => current.filter((item) => !item.completed));
  }

  return (
    <section className="shopping-page">
      <div className="shopping-shell">
        <div className="shopping-state-controls">
          <p>WIREFRAME STATE CONTROLS</p>
          <div className="shopping-state-buttons">
            <button
              type="button"
              className={`shopping-state-button ${
                stateView === "with-items" ? "shopping-state-button-active" : ""
              }`}
              onClick={() => setStateView("with-items")}
            >
              With Items
            </button>
            <button
              type="button"
              className={`shopping-state-button ${isEmpty ? "shopping-state-button-active" : ""}`}
              onClick={() => setStateView("empty")}
            >
              Empty
            </button>
            <button
              type="button"
              className={`shopping-state-button ${
                generationSuccess ? "shopping-state-button-active" : ""
              }`}
              onClick={() => setStateView("generation-success")}
            >
              Generation Success
            </button>
          </div>
        </div>

        <header className="shopping-header">
          <div>
            <h1>Shopping List</h1>
            <p>
              {totalItems} items to purchase | {completedItems} completed
            </p>
          </div>
          <button
            type="button"
            className="shopping-clear-completed"
            onClick={clearCompleted}
          >
            <TrashIcon />
            Clear Completed
          </button>
        </header>

        <div className="shopping-layout">
          <div className="shopping-list-column">
            <section className="shopping-section">
              <h2>From Recipes</h2>
              <div className="shopping-items-card">
                {visibleRecipeItems.length > 0 ? (
                  visibleRecipeItems.map((item) => (
                    <div className="shopping-item-row" key={item.id}>
                      <label className="shopping-item-main">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => toggleItem("recipe", item.id)}
                        />
                        <div className={item.completed ? "shopping-item-copy is-completed" : "shopping-item-copy"}>
                          <strong>{item.name}</strong>
                          <p>
                            {item.amount} | {item.source}
                          </p>
                        </div>
                      </label>
                      <button
                        type="button"
                        className="shopping-remove-button"
                        onClick={() => removeItem("recipe", item.id)}
                      >
                        x
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="shopping-empty-copy">No recipe-generated items yet.</div>
                )}
              </div>
            </section>

            <section className="shopping-section">
              <h2>Custom Items</h2>
              <div className="shopping-items-card">
                {visibleCustomItems.length > 0 ? (
                  visibleCustomItems.map((item) => (
                    <div className="shopping-item-row" key={item.id}>
                      <label className="shopping-item-main">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => toggleItem("custom", item.id)}
                        />
                        <div className={item.completed ? "shopping-item-copy is-completed" : "shopping-item-copy"}>
                          <strong>{item.name}</strong>
                          <p>{item.amount}</p>
                        </div>
                      </label>
                      <button
                        type="button"
                        className="shopping-remove-button"
                        onClick={() => removeItem("custom", item.id)}
                      >
                        x
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="shopping-empty-copy">No custom items added yet.</div>
                )}
              </div>
            </section>
          </div>

          <aside className="shopping-custom-card">
            <h2>Add Custom Item</h2>

            <label className="shopping-field">
              <span>Item Name</span>
              <input
                type="text"
                placeholder="e.g., Milk"
                value={itemName}
                onChange={(event) => setItemName(event.target.value)}
              />
            </label>

            <label className="shopping-field">
              <span>Amount (optional)</span>
              <input
                type="text"
                placeholder="e.g., 1 liter"
                value={itemAmount}
                onChange={(event) => setItemAmount(event.target.value)}
              />
            </label>

            <button
              type="button"
              className="shopping-add-item-button"
              onClick={addCustomItem}
            >
              <PlusIcon />
              Add Item
            </button>

            <div className="shopping-tip-box">
              <strong>Tip</strong>
              <p>Generate shopping lists automatically from recipe details pages.</p>
            </div>

            {generationSuccess && (
              <div className="shopping-success-banner">
                Items were generated successfully from a recipe.
              </div>
            )}
          </aside>
        </div>

        <section className="shopping-notes-card">
          <h2>SYSTEM BEHAVIOR</h2>
          <ul>
            <li>Shopping list synced across devices in real-time</li>
            <li>Items grouped by source from recipes vs. custom</li>
            <li>Generate Shopping List from recipe detail page adds missing ingredients</li>
            <li>Checkbox marks items as purchased without feedback</li>
            <li>Clear Completed removes all checked items at once</li>
            <li>Custom items can be added manually with optional amounts</li>
            <li>Recipe source shown for auto-generated items</li>
          </ul>
        </section>
      </div>
    </section>
  );
}

export default ShoppingList;
