/* SCRIPT GENERAL - 5ta Esencia*/

/*Validaciones + menú hamburguesa*/
document.addEventListener('DOMContentLoaded', function () {

//FORMULARIO
  var form = document.getElementById('contactForm');
  var btnSubmit = document.getElementById('btnSubmit');
  var formStatus = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      clearErrors();
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      var nombre = document.getElementById('nombre').value.trim();
      var email = document.getElementById('email').value.trim();
      var telefono = document.getElementById('telefono').value.trim();
      var mensaje = document.getElementById('mensaje').value.trim();

      var isValid = true;

      if (!validateNombre(nombre)) isValid = false;
      if (!validateEmail(email)) isValid = false;
      if (!validateTelefono(telefono)) isValid = false;
      if (!validateMensaje(mensaje)) isValid = false;

      if (!isValid) return;

      btnSubmit.disabled = true;
      btnSubmit.textContent = 'Enviando...';

      var formData = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(function (response) {
        if (response.ok) {
          formStatus.textContent = '¡Mensaje enviado con éxito!';
          formStatus.className = 'form-status success';
          form.reset();
        } else {
          formStatus.textContent = 'Error al enviar.';
          formStatus.className = 'form-status error';
        }
      })
      .catch(function () {
        formStatus.textContent = 'Error de conexión.';
        formStatus.className = 'form-status error';
      })
      .finally(function () {
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Enviar mensaje';
      });
    });
  }

//MENÚ HAMBURGUESA
  var toggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("active");
    });
  }

});

/* ================= VALIDACIONES ================= */

function validateNombre(value) {
  var errorEl = document.getElementById('error-nombre');
  var inputEl = document.getElementById('nombre');

  if (value === '' || value.length < 3) {
    showError(inputEl, errorEl, 'Nombre inválido');
    return false;
  }
  return true;
}

function validateEmail(value) {
  var errorEl = document.getElementById('error-email');
  var inputEl = document.getElementById('email');

  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(value)) {
    showError(inputEl, errorEl, 'Correo inválido');
    return false;
  }
  return true;
}

function validateTelefono(value) {
  var errorEl = document.getElementById('error-telefono');
  var inputEl = document.getElementById('telefono');

  var digits = value.replace(/\D/g, '');

  if (digits.length < 10) {
    showError(inputEl, errorEl, 'Teléfono inválido');
    return false;
  }
  return true;
}

function validateMensaje(value) {
  var errorEl = document.getElementById('error-mensaje');
  var inputEl = document.getElementById('mensaje');

  if (value.length < 10) {
    showError(inputEl, errorEl, 'Mensaje muy corto');
    return false;
  }
  return true;
}

/* ================= ERRORES ================= */

function showError(inputEl, errorEl, message) {
  if (inputEl) inputEl.classList.add('input-error');
  if (errorEl) errorEl.textContent = message;
}

function clearErrors() {
  var errors = document.querySelectorAll('.error-msg');
  var inputs = document.querySelectorAll('input, textarea');

  errors.forEach(e => e.textContent = '');
  inputs.forEach(i => i.classList.remove('input-error'));
}