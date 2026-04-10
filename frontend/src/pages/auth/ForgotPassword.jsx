import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./forgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const isFormValid = useMemo(() => {
    return email.trim();
  }, [email]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!isFormValid) return;

navigate("/loading", { state: { redirectTo: "/reset-password" } });
  }

  return (
    <section className="forgot-screen">
      <header className="forgot-topbar">
        <button
          type="button"
          className="forgot-brand-button"
          onClick={() => navigate("/loading", { state: { redirectTo: "/" } })}
          aria-label="Go to CookSmart home"
        >
          <span className="forgot-brand-mark">CS</span>
          <span className="forgot-brand-name">CookSmart</span>
        </button>

        <button
          type="button"
          className="forgot-canvas-button"
          onClick={() => navigate("/")}
        >
          ← Canvas
        </button>
      </header>

      <div className="forgot-content">
        <div className="forgot-card-wrapper">
          <form className="forgot-card" onSubmit={handleSubmit}>
            <div className="forgot-heading-group">
              <h1>Forgot Password</h1>
              <p>Enter your email address and we&apos;ll send you a reset link</p>
            </div>

            <label className="forgot-field-label" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <button
              type="submit"
              className="forgot-submit"
              disabled={!isFormValid}
            >
              Send Reset Link
            </button>

            <p className="forgot-login-link-row">
                            Remember your password?{" "}
              <Link to="/loading" state={{ redirectTo: "/login" }}>
                Back to Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;