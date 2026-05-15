document.addEventListener('DOMContentLoaded', () => {
  const API_URL = "http://localhost:8080";

  const loginForm = document.getElementById('loginForm');
  const loginStatus = document.getElementById('loginStatus');
  const emailInput = document.getElementById('login-email');
  const passInput = document.getElementById('login-password');

  if (!loginForm) return;

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    loginStatus.textContent = "";
    loginStatus.style.color = "red";

    const correo = emailInput.value.trim();
    const contrasena = passInput.value.trim();

    if (correo === "" || contrasena === "") {
      loginStatus.textContent = "Correo y contraseña son obligatorios.";
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
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
        loginStatus.textContent = "Correo o contraseña incorrectos.";
        return;
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("correo", data.correo);
      localStorage.setItem("rol", data.rol);

      loginStatus.style.color = "green";
      loginStatus.textContent = "Inicio de sesión exitoso. Redirigiendo...";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);

    } catch (error) {
      console.error("Error en login:", error);
      loginStatus.textContent = "Error de conexión con el servidor.";
    }
  });
});