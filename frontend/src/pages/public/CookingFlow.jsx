import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./cookingFlow.css";

const recipeFlowMap = {
  1: {
    id: 1,
    title: "Spaghetti Carbonara",
    description: "Follow each step carefully for the best results",
    steps: [
      {
        id: 1,
        title: "Step 1",
        time: "Estimated time: 10 min",
        description:
          "Bring a large pot of salted water to a boil. Add spaghetti and cook according to package directions.",
        tip: "Salt the water generously - it should taste like the sea.",
      },
      {
        id: 2,
        title: "Step 2",
        time: "2 min",
        description: "Beat the eggs in a bowl and whisk in finely grated Parmesan cheese.",
      },
      {
        id: 3,
        title: "Step 3",
        time: "4 min",
        description: "Cook pancetta in a skillet over medium heat until golden and crisp.",
      },
      {
        id: 4,
        title: "Step 4",
        time: "3 min",
        description: "Transfer the cooked pasta into the skillet, reserving some pasta water.",
      },
      {
        id: 5,
        title: "Step 5",
        time: "2 min",
        description: "Remove from heat, then stir in the egg and cheese mixture quickly.",
      },
      {
        id: 6,
        title: "Step 6",
        time: "1 min",
        description: "Season with black pepper and serve immediately with extra Parmesan.",
      },
    ],
  },
  2: {
    id: 2,
    title: "Chicken Teriyaki Bowl",
    description: "A savory rice bowl with glazed chicken and vegetables",
    steps: [
      { id: 1, title: "Step 1", time: "8 min", description: "Cook the chicken in a skillet until browned." },
      { id: 2, title: "Step 2", time: "5 min", description: "Add soy sauce and let it reduce into a glossy glaze." },
      { id: 3, title: "Step 3", time: "7 min", description: "Steam the vegetables until just tender." },
      { id: 4, title: "Step 4", time: "5 min", description: "Serve over warm rice and finish with sesame seeds." },
    ],
  },
  3: {
    id: 3,
    title: "Greek Salad",
    description: "A crisp salad with cucumber, tomatoes, olives, and feta",
    steps: [
      { id: 1, title: "Step 1", time: "5 min", description: "Chop the vegetables into bite-size pieces." },
      { id: 2, title: "Step 2", time: "3 min", description: "Whisk olive oil with salt and pepper." },
      { id: 3, title: "Step 3", time: "2 min", description: "Toss the vegetables with olives and dressing." },
      { id: 4, title: "Step 4", time: "5 min", description: "Top with feta and serve immediately." },
    ],
  },
  4: {
    id: 4,
    title: "Beef Tacos",
    description: "Quick tacos layered with seasoned beef and fresh toppings",
    steps: [
      { id: 1, title: "Step 1", time: "8 min", description: "Brown the ground beef in a skillet." },
      { id: 2, title: "Step 2", time: "4 min", description: "Stir in seasoning with a splash of water." },
      { id: 3, title: "Step 3", time: "3 min", description: "Warm the taco shells until crisp." },
      { id: 4, title: "Step 4", time: "5 min", description: "Fill shells with beef and toppings." },
    ],
  },
  5: {
    id: 5,
    title: "Thai Green Curry",
    description: "Creamy curry with vegetables and fragrant herbs",
    steps: [
      { id: 1, title: "Step 1", time: "5 min", description: "Fry the curry paste until fragrant." },
      { id: 2, title: "Step 2", time: "10 min", description: "Add coconut milk and bring to a gentle simmer." },
      { id: 3, title: "Step 3", time: "12 min", description: "Cook the chicken and vegetables until tender." },
      { id: 4, title: "Step 4", time: "8 min", description: "Season and finish with fresh basil." },
    ],
  },
  10: {
    id: 10,
    title: "Homemade Pizza",
    description: "A homemade pizza with bubbling cheese and crisp crust",
    steps: [
      { id: 1, title: "Step 1", time: "10 min", description: "Stretch the dough on a floured surface." },
      { id: 2, title: "Step 2", time: "5 min", description: "Spread sauce and add cheese evenly." },
      { id: 3, title: "Step 3", time: "20 min", description: "Bake until the crust is golden and crisp." },
      { id: 4, title: "Step 4", time: "10 min", description: "Top with basil, slice, and serve hot." },
    ],
  },
  11: {
    id: 11,
    title: "Chicken Stir Fry",
    description: "A fast wok-style dinner built from pantry ingredients",
    steps: [
      { id: 1, title: "Step 1", time: "6 min", description: "Slice the chicken and vegetables into even strips." },
      { id: 2, title: "Step 2", time: "8 min", description: "Sear the chicken in a hot pan until nearly cooked through." },
      { id: 3, title: "Step 3", time: "6 min", description: "Add vegetables, garlic, and ginger, then stir fry until tender-crisp." },
      { id: 4, title: "Step 4", time: "5 min", description: "Finish with soy sauce and serve over rice." },
    ],
  },
  12: {
    id: 12,
    title: "Chicken Fried Rice",
    description: "Comforting fried rice using leftover rice and simple aromatics",
    steps: [
      { id: 1, title: "Step 1", time: "6 min", description: "Cook the chicken pieces until lightly browned." },
      { id: 2, title: "Step 2", time: "4 min", description: "Scramble the eggs and set them aside." },
      { id: 3, title: "Step 3", time: "10 min", description: "Saute onions, garlic, peas, and carrots until fragrant." },
      { id: 4, title: "Step 4", time: "5 min", description: "Add rice, chicken, and soy sauce, tossing until evenly coated." },
      { id: 5, title: "Step 5", time: "5 min", description: "Fold the eggs back in and finish with green onions." },
    ],
  },
};

const systemBehavior = [
  "Cooking session tied to recipe ID in page state",
  "Progress saved automatically after each marked step",
  "Step completion stored with visual feedback",
  "Navigation allows jumping to any step",
  "Finish button returns to full recipe view",
  "Completion modal confirms recipe added to history",
  "User stats updated after completed recipe events",
  "Exit button allows leaving without completing",
];

function CookingFlow() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const [stateView, setStateView] = useState("in-progress");
  const [currentStep, setCurrentStep] = useState(1);
  const recipe = recipeFlowMap[recipeId] ?? recipeFlowMap[1];
  const steps = recipe.steps;

  const currentStepData = steps[currentStep - 1];
  const progress = Math.round((currentStep / steps.length) * 100);
  const isFinished = stateView === "finished";

  function goToNextStep() {
    if (currentStep < steps.length) {
      setCurrentStep((value) => value + 1);
      return;
    }

    setStateView("finished");
  }

  function goToPreviousStep() {
    if (currentStep > 1) {
      setCurrentStep((value) => value - 1);
    }
  }

  function markStepComplete() {
    goToNextStep();
  }

  return (
    <section className="flow-page">
      <div className="flow-shell">


        <div className="flow-topbar">
          <span>
            Step {currentStep} of {steps.length}
          </span>
          <span>{progress}% Complete</span>
        </div>

        <div className="flow-progress">
          <div className="flow-progress-bar" style={{ width: `${progress}%` }} />
        </div>

        <header className="flow-header">
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
        </header>

        <div className="flow-layout">
          <section className="flow-main-card">
            {!isFinished ? (
              <>
                <div className="flow-step-badge-row">
                  <span className="flow-step-badge">{currentStep}</span>
                  <div className="flow-step-meta">
                    <strong>{currentStepData.title}</strong>
                    <span>{currentStepData.time}</span>
                  </div>
                </div>

                <p className="flow-step-description">{currentStepData.description}</p>

                {currentStepData.tip ? (
                  <div className="flow-tip-box">
                    <strong>Pro Tip</strong>
                    <p>{currentStepData.tip}</p>
                  </div>
                ) : null}

                <button type="button" className="flow-complete-button" onClick={markStepComplete}>
                  Mark Step Complete
                </button>
              </>
            ) : (
              <div className="flow-finished-state">
                <h2>Cooking Complete</h2>
                <p>Your recipe has been completed and can now be added to history.</p>
              </div>
            )}

            <div className="flow-nav-buttons">
              <button type="button" className="flow-nav-button" onClick={goToPreviousStep}>
                Previous Step
              </button>
              <button type="button" className="flow-nav-button flow-nav-button-primary" onClick={goToNextStep}>
                {currentStep === steps.length ? "Finish" : "Next Step"}
              </button>
            </div>
          </section>

          <aside className="flow-side-card">
            <h2>All Steps</h2>
            <div className="flow-step-list">
              {steps.map((step) => (
                <button
                  key={step.id}
                  type="button"
                  className={`flow-step-list-item ${
                    step.id === currentStep ? "flow-step-list-item-active" : ""
                  }`}
                  onClick={() => setCurrentStep(step.id)}
                >
                  <div>
                    <strong>{`Step ${step.id}`}</strong>
                    <span>{step.time}</span>
                  </div>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="flow-exit-button"
              onClick={() => navigate(`/recipes/${recipe.id}`)}
            >
              Exit Cooking Mode
            </button>
          </aside>
        </div>


      </div>
    </section>
  );
}

export default CookingFlow;
