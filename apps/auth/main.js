const API_BASE = "https://api.freeapi.app/api/v1/users";

// State
let currentToken = localStorage.getItem("auth_token") || null;

// DOM Elements
const authContainer = document.getElementById("auth-container");
const profileContainer = document.getElementById("profile-container");
const alertContainer = document.getElementById("alert-container");

const tabLogin = document.getElementById("tab-login");
const tabRegister = document.getElementById("tab-register");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

const loginBtn = document.getElementById("login-btn");
const regBtn = document.getElementById("reg-btn");
const logoutBtn = document.getElementById("logout-btn");

// UI Helpers
function showAlert(message, type = "success") {
  alertContainer.textContent = message;
  alertContainer.classList.remove("hidden", "bg-green-500", "bg-red-500", "text-white");
  
  if (type === "success") {
    alertContainer.classList.add("bg-green-500", "text-white");
  } else {
    alertContainer.classList.add("bg-red-500", "text-white");
  }

  setTimeout(() => {
    alertContainer.classList.add("hidden");
  }, 4000);
}

function setLoading(button, isLoading) {
  const span = button.querySelector("span");
  const loader = button.querySelector(".loader");
  
  if (isLoading) {
    span.classList.add("hidden");
    loader.classList.remove("hidden");
    button.disabled = true;
    button.classList.add("opacity-80", "cursor-not-allowed");
  } else {
    span.classList.remove("hidden");
    loader.classList.add("hidden");
    button.disabled = false;
    button.classList.remove("opacity-80", "cursor-not-allowed");
  }
}

// API Helpers
async function fetchAPI(endpoint, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers
  };

  if (currentToken) {
    headers["Authorization"] = `Bearer ${currentToken}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data.data;
}

// Actions
async function login(username, password) {
  try {
    setLoading(loginBtn, true);
    const data = await fetchAPI("/login", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });
    
    currentToken = data.accessToken;
    localStorage.setItem("auth_token", currentToken);
    
    showAlert("Logged in successfully!", "success");
    checkAuth();
  } catch (error) {
    showAlert(error.message, "error");
  } finally {
    setLoading(loginBtn, false);
  }
}

async function register(email, username, password) {
  try {
    setLoading(regBtn, true);
    await fetchAPI("/register", {
      method: "POST",
      body: JSON.stringify({ email, username, password, role: "USER" })
    });
    
    showAlert("Account created! Please log in.", "success");
    switchTab("login");
  } catch (error) {
    showAlert(error.message, "error");
  } finally {
    setLoading(regBtn, false);
  }
}

async function logout() {
  try {
    setLoading(logoutBtn, true);
    // Best effort logout
    await fetchAPI("/logout", { method: "POST" }).catch(() => {});
  } finally {
    currentToken = null;
    localStorage.removeItem("auth_token");
    setLoading(logoutBtn, false);
    showAlert("Logged out successfully.", "success");
    checkAuth();
  }
}

async function fetchCurrentUser() {
  try {
    const user = await fetchAPI("/current-user");
    document.getElementById("profile-name").textContent = user.username;
    document.getElementById("profile-email").textContent = user.email;
    document.getElementById("profile-role").textContent = user.role;
    document.getElementById("profile-initial").textContent = user.username.charAt(0).toUpperCase();
    
    authContainer.classList.add("hidden");
    profileContainer.classList.remove("hidden");
  } catch (error) {
    currentToken = null;
    localStorage.removeItem("auth_token");
    authContainer.classList.remove("hidden");
    profileContainer.classList.add("hidden");
  }
}

function checkAuth() {
  if (currentToken) {
    fetchCurrentUser();
  } else {
    authContainer.classList.remove("hidden");
    profileContainer.classList.add("hidden");
  }
}

// Events
function switchTab(tab) {
  if (tab === "login") {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    tabLogin.className = "flex-1 py-2 rounded-md text-sm font-bold bg-white shadow-sm text-brand-text transition-colors";
    tabRegister.className = "flex-1 py-2 rounded-md text-sm font-bold text-brand-text/60 hover:text-brand-text transition-colors";
  } else {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    tabRegister.className = "flex-1 py-2 rounded-md text-sm font-bold bg-white shadow-sm text-brand-text transition-colors";
    tabLogin.className = "flex-1 py-2 rounded-md text-sm font-bold text-brand-text/60 hover:text-brand-text transition-colors";
  }
}

tabLogin.addEventListener("click", () => switchTab("login"));
tabRegister.addEventListener("click", () => switchTab("register"));

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  login(
    document.getElementById("login-username").value,
    document.getElementById("login-password").value
  );
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  register(
    document.getElementById("reg-email").value,
    document.getElementById("reg-username").value,
    document.getElementById("reg-password").value
  );
});

logoutBtn.addEventListener("click", logout);

// Initialize
checkAuth();
