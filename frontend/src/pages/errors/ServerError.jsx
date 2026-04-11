import { useNavigate } from "react-router-dom";
import "./errorPages.css";

function ServerError() {
  const navigate = useNavigate();

  return (
    <section className="error-screen">
      <header className="error-topbar">
        <button
          type="button"
          className="error-brand-button"
          onClick={() => navigate("/")}
        >
          <span className="error-brand-mark">CS</span>
          <span className="error-brand-name">CookSmart</span>
        </button>

        <button
          type="button"
          className="error-canvas-button"
          onClick={() => navigate("/")}
        >
          ← Canvas
        </button>
      </header>

      <div className="error-content">
        <div className="error-card">
          <h1 className="error-code">500</h1>
          <h2 className="error-title">Server Error</h2>
          <p className="error-description">
            Something went wrong on our end. Please try again later.
          </p>

          <div className="error-actions">
            <button
              type="button"
              className="error-primary-button"
              onClick={() => navigate("/")}
            >
              Go to Homepage
            </button>

            <button
              type="button"
              className="error-secondary-button"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServerError;