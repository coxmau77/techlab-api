document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://localhost:3000";

  // --- ELEMENTOS DEL DOM ---
  // Navegación
  const loginNav = document.getElementById("login-nav");
  const registerNav = document.getElementById("register-nav");
  const myProductsNav = document.getElementById("my-products-nav");
  const logoutNav = document.getElementById("logout-nav");

  // Diálogos
  const loginDialog = document.getElementById("login-dialog");
  const registerDialog = document.getElementById("register-dialog");

  // Botones de cierre de diálogos
  const closeLoginDialog = document.getElementById("close-login-dialog");
  const closeRegisterDialog = document.getElementById("close-register-dialog");

  // Formularios
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  // --- MANEJO DE DIÁLOGOS ---
  loginNav.addEventListener("click", (e) => {
    e.preventDefault();
    loginDialog.showModal();
  });

  registerNav.addEventListener("click", (e) => {
    e.preventDefault();
    registerDialog.showModal();
  });

  closeLoginDialog.addEventListener("click", () => {
    loginDialog.close();
  });

  closeRegisterDialog.addEventListener("click", () => {
    registerDialog.close();
  });

  logoutNav.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    updateUIVisibility();
  });

  // --- LÓGICA DE UI ---
  const updateUIVisibility = () => {
    const token = localStorage.getItem("token");
    if (token) {
      loginNav.classList.add("hidden");
      registerNav.classList.add("hidden");
      myProductsNav.classList.remove("hidden");
      logoutNav.classList.remove("hidden");
    } else {
      loginNav.classList.remove("hidden");
      registerNav.classList.remove("hidden");
      myProductsNav.classList.add("hidden");
      logoutNav.classList.add("hidden");
    }
  };

  // --- AUTENTICACIÓN ---
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("register-username").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Error en el registro");

      alert("¡Registro exitoso! Por favor, inicia sesión.");
      registerForm.reset();
      registerDialog.close();
      loginDialog.showModal();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error en el login");

      localStorage.setItem("token", data.data.token);
      window.location.href = "pages/products.html";
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });

  // --- INICIALIZACIÓN ---
  updateUIVisibility();
});