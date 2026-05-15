/* LOGIN - CONEXIÓN CON BACKEND */

document.addEventListener("DOMContentLoaded", function () {
  const API_BASE_URL = "http://localhost:8080";

  // ================= MENÚ HAMBURGUESA =================
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("active");
    });
  }

  // ================= LOGIN =================
  const loginForm = document.getElementById("loginForm");
  const loginStatus = document.getElementById("loginStatus");
  const emailInput = document.getElementById("login-email");
  const passInput = document.getElementById("login-password");
  const emailErr = document.getElementById("error-login-email");
  const passErr = document.getElementById("error-login-password");

  if (!loginForm) return;

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    limpiarErroresLogin();

    if (loginStatus) {
      loginStatus.textContent = "";
      loginStatus.className = "form-status";
    }

    const correo = emailInput.value.trim();
    const contrasena = passInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    if (!emailRegex.test(correo)) {
      mostrarErrorLogin(emailInput, emailErr, "Correo inválido");
      isValid = false;
    }

    if (contrasena.length < 6) {
      mostrarErrorLogin(passInput, passErr, "Mínimo 6 caracteres");
      isValid = false;
    }

    if (!isValid) return;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          correo: correo,
          contrasena: contrasena
        })
      });

      if (!response.ok) {
        if (loginStatus) {
          loginStatus.textContent = "Correo o contraseña incorrectos.";
          loginStatus.className = "form-status error";
        }
        return;
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("correo", data.correo);
      localStorage.setItem("rol", data.rol);

      if (loginStatus) {
        loginStatus.textContent = "Inicio de sesión exitoso. Redirigiendo...";
        loginStatus.className = "form-status success";
      }

      setTimeout(function () {
        window.location.href = "index.html";
      }, 1000);

    } catch (error) {
      console.error("Error en login:", error);

      if (loginStatus) {
        loginStatus.textContent = "Error de conexión con el servidor.";
        loginStatus.className = "form-status error";
      }
    }
  });
});

/* ================= ERRORES LOGIN ================= */

function mostrarErrorLogin(inputEl, errorEl, message) {
  if (inputEl) inputEl.classList.add("input-error");
  if (errorEl) errorEl.textContent = message;
}

function limpiarErroresLogin() {
  const errors = document.querySelectorAll(".error-msg");
  const inputs = document.querySelectorAll("input");

  errors.forEach(e => e.textContent = "");
  inputs.forEach(i => i.classList.remove("input-error"));
}