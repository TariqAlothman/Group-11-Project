import { useNavigate } from "react-router-dom";
import "./errorPages.css";

function NotFound() {
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
          <h1 className="error-code">404</h1>
          <h2 className="error-title">Page Not Found</h2>
          <p className="error-description">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
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
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound;