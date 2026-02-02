// Get token for API calls
export const getToken = () => {
  return localStorage.getItem("token");
};

// Get role for route protection
export const getRole = () => {
  return localStorage.getItem("role");
};

// Save auth data after login
export const saveAuth = (token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
};

// Clear auth on logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
