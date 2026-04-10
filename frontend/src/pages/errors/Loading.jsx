import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./errorPages.css";

function Loading() {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.redirectTo || "/";

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirectTo, { replace: true });
    }, 1200);

    return () => clearTimeout(timer);
  }, [navigate, redirectTo]);

  return (
    <section className="loading-screen">
      <header className="loading-topbar">
        <button
          type="button"
          className="loading-brand-button"
          onClick={() => navigate("/")}
        >
          <span className="loading-brand-mark">CS</span>
          <span className="loading-brand-name">CookSmart</span>
        </button>

        <button
          type="button"
          className="loading-canvas-button"
          onClick={() => navigate("/")}
        >
          ← Canvas
        </button>
      </header>

      <div className="loading-content">
        <div className="loading-card">
          <div className="loading-spinner"></div>
          <h2 className="loading-title">Loading...</h2>
          <p className="loading-description">
            Please wait while we fetch your data
          </p>
        </div>
      </div>
    </section>
  );
}

export default Loading;