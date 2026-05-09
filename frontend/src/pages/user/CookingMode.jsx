import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cookingMode.css";

const CookingMode = () => {
  const navigate = useNavigate();
  const [wireframeState, setWireframeState] = useState("In Progress");
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    {
      id: 1,
      time: "10 min",
      instruction: "Bring a large pot of salted water to a boil. Add spaghetti and cook according to package directions.",
      proTip: "Salt the water generously - it should taste like the sea"
    },
    { id: 2, time: "3 min", instruction: "While pasta cooks, beat eggs in a bowl and mix in grated Parmesan cheese." },
    { id: 3, time: "5 min", instruction: "Cook pancetta in a large skillet over medium heat until crispy." },
    { id: 4, time: "2 min", instruction: "Drain pasta, reserving 1 cup of pasta water. Add hot pasta to the skillet with pancetta." },
    { id: 5, time: "3 min", instruction: "Remove from heat and quickly stir in egg mixture, adding pasta water as needed." },
    { id: 6, time: "2 min", instruction: "Season with black pepper and serve immediately with extra Parmesan." },
  ];

  const toggleComplete = (stepId) => {
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(completedSteps.filter(id => id !== stepId));
    } else {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const isStepComplete = (stepId) => completedSteps.includes(stepId);
  const progressPercent = Math.round((completedSteps.length / steps.length) * 100);

  const activeStepData = steps.find(s => s.id === currentStep) || steps[0];

  return (
    <div className="cooking-mode-container">


      <div className="progress-header">
        <span>Step {currentStep} of {steps.length}</span>
        <span>{progressPercent}% Complete</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
      </div>

      <div className="recipe-header">
        <h1>Spaghetti Carbonara</h1>
        <p>Follow each step carefully for the best results</p>
      </div>

      <div className="cooking-grid">
        <div className="current-step-panel">
          <div className="step-content">
            <div className="step-indicator">
              <div className="step-number-box">{activeStepData.id}</div>
              <div className="step-meta">
                <h3>Step {activeStepData.id}</h3>
                <p>Estimated time: {activeStepData.time}</p>
              </div>
            </div>

            <div className="step-instruction">
              {activeStepData.instruction}
            </div>

            {activeStepData.proTip && (
              <div className="pro-tip">
                <div className="pro-tip-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                    <path d="M12 2A7 7 0 0 0 5 9c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7Z" />
                  </svg>
                  <span>Pro Tip</span>
                </div>
                <p>{activeStepData.proTip}</p>
              </div>
            )}

            <button 
              className={`mark-complete-btn ${isStepComplete(activeStepData.id) ? "completed" : ""}`}
              onClick={() => toggleComplete(activeStepData.id)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {isStepComplete(activeStepData.id) ? "Completed" : "Mark Step Complete"}
            </button>
          </div>

          <div className="navigation-controls">
            <button 
              className="nav-btn" 
              disabled={currentStep === 1}
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Previous Step
            </button>
            <button 
              className="nav-btn primary"
              disabled={currentStep === steps.length}
              onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
            >
              Next Step
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="all-steps-panel">
          <h3>All Steps</h3>
          <div className="steps-list">
            {steps.map(step => (
              <div 
                key={step.id} 
                className={`step-item ${currentStep === step.id ? "active" : ""}`}
                onClick={() => setCurrentStep(step.id)}
              >
                <div className="step-item-number">{step.id}</div>
                <div className="step-item-meta">
                  <h4>Step {step.id}</h4>
                  <p>{step.time}</p>
                </div>
                {isStepComplete(step.id) && (
                  <svg style={{ marginLeft: 'auto', stroke: currentStep === step.id ? 'white' : '#22C55E' }} width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          <button className="exit-btn" onClick={() => navigate(-1)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
            Exit Cooking Mode
          </button>
        </div>
      </div>


    </div>
  );
};

export default CookingMode;
