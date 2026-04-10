import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./resetPassword.css";

function EyeIcon({ open }) {
  const title = open ? "Hide password" : "Show password";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="reset-eye-icon"
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

function ResetPassword() {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const isFormValid = useMemo(() => {
    return (
      newPassword.trim() &&
      confirmNewPassword.trim() &&
      newPassword === confirmNewPassword
    );
  }, [newPassword, confirmNewPassword]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!isFormValid) return;

navigate("/loading", { state: { redirectTo: "/login" } });
  }

  return (
    <section className="reset-screen">
      <header className="reset-topbar">
        <button
          type="button"
          className="reset-brand-button"
          onClick={() => navigate("/loading", { state: { redirectTo: "/" } })}
          aria-label="Go to CookSmart home"
        >
          <span className="reset-brand-mark">CS</span>
          <span className="reset-brand-name">CookSmart</span>
        </button>

        <button
          type="button"
          className="reset-canvas-button"
          onClick={() => navigate("/")}
        >
          ← Canvas
        </button>
      </header>

      <div className="reset-content">
        <div className="reset-card-wrapper">
          <form className="reset-card" onSubmit={handleSubmit}>
            <div className="reset-heading-group">
              <h1>Reset Password</h1>
              <p>Enter your new password</p>
            </div>

            <label className="reset-field-label" htmlFor="newPassword">
              New Password
            </label>
            <div className="reset-password-field">
              <input
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                required
              />

              <button
                type="button"
                className="reset-toggle-password"
                aria-label={showNewPassword ? "Hide password" : "Show password"}
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                <EyeIcon open={showNewPassword} />
              </button>
            </div>

            <label className="reset-field-label" htmlFor="confirmNewPassword">
              Confirm New Password
            </label>
            <div className="reset-password-field">
              <input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type={showConfirmNewPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmNewPassword}
                onChange={(event) => setConfirmNewPassword(event.target.value)}
                required
              />

              <button
                type="button"
                className="reset-toggle-password"
                aria-label={
                  showConfirmNewPassword ? "Hide password" : "Show password"
                }
                onClick={() => setShowConfirmNewPassword((prev) => !prev)}
              >
                <EyeIcon open={showConfirmNewPassword} />
              </button>
            </div>

            <button
              type="submit"
              className="reset-submit"
              disabled={!isFormValid}
            >
              Reset Password
            </button>

            <p className="reset-login-link-row">
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

export default ResetPassword;