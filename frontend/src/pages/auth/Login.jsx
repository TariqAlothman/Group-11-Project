import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function EyeIcon({ open }) {
  const title = open ? "Hide password" : "Show password";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="login-eye-icon"
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

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid = useMemo(() => {
    return email.trim() && password.trim();
  }, [email, password]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!isFormValid) return;

navigate("/loading", { state: { redirectTo: "/browse" } });
  }

  return (
    <section className="login-screen">
      <header className="login-topbar">
        <button
          type="button"
          className="brand-button"
          onClick={() => navigate("/")}
          aria-label="Go to CookSmart home"
        >
          <span className="brand-mark">CS</span>
          <span className="brand-name">CookSmart</span>
        </button>

        <button
          type="button"
          className="canvas-button"
          onClick={() => navigate("/")}
        >
          ← Canvas
        </button>
      </header>

      <div className="login-content">
        <div className="login-card-wrapper">
          <form className="login-card" onSubmit={handleSubmit}>
            <div className="login-heading-group">
              <h1>Login</h1>
              <p>Access your CookSmart account</p>
            </div>

            <label className="field-label" htmlFor="email">
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

            <label className="field-label" htmlFor="password">
              Password
            </label>

            <div className="password-field">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              <button
                type="button"
                className="toggle-password"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>

            <div className="support-link-row">
              <Link to="/forgot-password">
  Forgot Password?
</Link>
            </div>

            <button
              type="submit"
              className="login-submit"
              disabled={!isFormValid}
            >
              Login
            </button>

            <p className="signup-link-row">
                            Don&apos;t have an account?{" "}
              <Link to="/signup">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;