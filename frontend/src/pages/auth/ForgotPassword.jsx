import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordAPI } from "../../utils/auth";
import "./forgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const isFormValid = useMemo(() => {
    return email.trim();
  }, [email]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isFormValid || isSubmitting) return;
    
    setError("");
    setIsSubmitting(true);
    
    try {
      const data = await forgotPasswordAPI(email.trim());
      setSuccess(true);
      setTimeout(() => {
        navigate("/loading", { state: { redirectTo: `/reset-password/${data.resetToken}` } });
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to generate reset link");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="forgot-screen">
      <header className="forgot-topbar">
        <button
          type="button"
          className="forgot-brand-button"
          onClick={() => navigate("/")}
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

            {success ? (
              <p className="forgot-success" style={{ color: "var(--admin-success)", marginBottom: "1rem" }}>
                Reset link generated! Redirecting...
              </p>
            ) : null}

            {error && (
              <p className="forgot-error" role="alert" style={{ color: "var(--admin-danger)", marginBottom: "1rem" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="forgot-submit"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </button>

            <p className="forgot-login-link-row">
                            Remember your password?{" "}
              <Link to="/login">
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