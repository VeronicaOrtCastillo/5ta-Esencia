/* REGISTRO - CONEXIÓN CON BACKEND */

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

  // ================= ELEMENTOS REGISTRO =================
  const registroForm = document.getElementById("registroForm");
  const passInput = document.getElementById("regPass");
  const passStrength = document.getElementById("passStrength");
  const regAlert = document.getElementById("regAlert");

  if (passInput && passStrength) {
    passInput.addEventListener("input", function () {
      const val = passInput.value;
      let mensaje = "";
      let color = "";

      if (val.length === 0) {
        mensaje = "";
      } else if (val.length < 6) {
        mensaje = "Muy corta";
        color = "red";
      } else if (val.match(/[A-Z]/) && val.match(/[0-9]/) && val.match(/[^A-Za-z0-9]/)) {
        mensaje = "Seguridad Alta (Fuerte)";
        color = "green";
      } else if (val.match(/[A-Z]/) || val.match(/[0-9]/)) {
        mensaje = "Seguridad Media";
        color = "orange";
      } else {
        mensaje = "Seguridad Baja";
        color = "#d4af37";
      }

      passStrength.textContent = mensaje;
      passStrength.style.color = color;
    });
  }

  if (!registroForm) return;

  registroForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;

    const nombreCompletoInput = document.getElementById("regNombre");
    const telefonoInput = document.getElementById("regTelefono");
    const emailInput = document.getElementById("regEmail");
    const passInput = document.getElementById("regPass");
    const confirmPassInput = document.getElementById("regPassConfirm");

    const nombreCompleto = nombreCompletoInput.value.trim();
    const telefono = telefonoInput.value.trim();
    const correo = emailInput.value.trim();
    const contrasena = passInput.value.trim();
    const confirmPass = confirmPassInput.value.trim();

    if (contrasena !== confirmPass) {
      confirmPassInput.setCustomValidity("No coincide");
    } else {
      confirmPassInput.setCustomValidity("");
    }

    if (!/^\d{10}$/.test(telefono)) {
      telefonoInput.setCustomValidity("Inválido");
    } else {
      telefonoInput.setCustomValidity("");
    }

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    const partesNombre = nombreCompleto.split(" ");
    const nombre = partesNombre[0];
    const apellido = partesNombre.slice(1).join(" ") || "Sin apellido";

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: nombre,
          apellido: apellido,
          correo: correo,
          telefono: telefono,
          contrasena: contrasena
        })
      });

      if (!response.ok) {
        if (regAlert) {
          regAlert.innerHTML = `
            <div class="alert alert-danger">
              No se pudo registrar el usuario. Revisa si el correo o teléfono ya existen.
            </div>
          `;
        } else {
          alert("No se pudo registrar el usuario.");
        }

        return;
      }

      if (regAlert) {
        regAlert.innerHTML = `
          <div class="alert alert-success">
            Usuario registrado con éxito. Redirigiendo al login...
          </div>
        `;
      } else {
        alert("Usuario registrado con éxito.");
      }

      setTimeout(function () {
        window.location.href = "login.html";
      }, 1000);

    } catch (error) {
      console.error("Error en registro:", error);

      if (regAlert) {
        regAlert.innerHTML = `
          <div class="alert alert-danger">
            Error de conexión con el servidor.
          </div>
        `;
      } else {
        alert("Error de conexión con el servidor.");
      }
    }
  });
});