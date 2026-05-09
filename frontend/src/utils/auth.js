const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000";

const AUTH_USER_KEY = "cooksmartUser";

async function requestAuth(path, body) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Authentication failed");
  }

  return data;
}

export function loginUser(credentials) {
  return requestAuth("/api/auth/login", credentials);
}

export function registerUser(userDetails) {
  return requestAuth("/api/auth/register", userDetails);
}

export function forgotPasswordAPI(email) {
  return requestAuth("/api/auth/forgot-password", { email });
}

export function resetPasswordAPI(token, password) {
  return requestAuth(`/api/auth/reset-password/${token}`, { password });
}

export function saveAuthUser(user) {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function getAuthUser() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_USER_KEY));
  } catch {
    return null;
  }
}

export function clearAuthUser() {
  localStorage.removeItem(AUTH_USER_KEY);
}
