import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";

function EyeIcon({ open }) {
  const title = open ? "Hide password" : "Show password";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="signup-eye-icon"
      focusable="false"
    >
      <path
        d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      {open ? null : (
        <path
          d="M4 4l16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      )}
      <title>{title}</title>
    </svg>
  );
}

function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isFormValid = useMemo(() => {
    return (
      fullName.trim() &&
      email.trim() &&
      password.trim() &&
      confirmPassword.trim() &&
      password === confirmPassword
    );
  }, [fullName, email, password, confirmPassword]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!isFormValid) return;

navigate("/loading", { state: { redirectTo: "/login" } });
  }

  return (
    <section className="signup-screen">
      <header className="signup-topbar">
        <button
          type="button"
          className="signup-brand-button"
          onClick={() => navigate("/")}          aria-label="Go to CookSmart home"
        >
          <span className="signup-brand-mark">CS</span>
          <span className="signup-brand-name">CookSmart</span>
        </button>

        <button
          type="button"
          className="signup-canvas-button"
          onClick={() => navigate("/")}
        >
          ← Canvas
        </button>
      </header>

      <div className="signup-content">
        <div className="signup-card-wrapper">
          <form className="signup-card" onSubmit={handleSubmit}>
            <div className="signup-heading-group">
              <h1>Sign Up</h1>
              <p>Create your CookSmart account</p>
            </div>

            <label className="signup-field-label" htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />

            <label className="signup-field-label" htmlFor="email">
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

            <label className="signup-field-label" htmlFor="password">
              Password
            </label>
            <div className="signup-password-field">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              <button
                type="button"
                className="signup-toggle-password"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>

            <label className="signup-field-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="signup-password-field">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />

              <button
                type="button"
                className="signup-toggle-password"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                <EyeIcon open={showConfirmPassword} />
              </button>
            </div>

            <button
              type="submit"
              className="signup-submit"
              disabled={!isFormValid}
            >
              Create Account
            </button>

            <p className="signup-login-link-row">
              Already have an account?{" "}
<Link to="/login">
  Login
</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup;