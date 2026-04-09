/* ============================================================
   PAGINA DE CONTACTO - 5ta Esencia
   Validacion de formulario + envio via Formspree
   ============================================================ */


/* ============================================================
   INTEGRANTE 7: CHRIS (Christian Escamilla)
   Branch: Christian-Hernandez
   Tarea: Funcion principal de validacion que se ejecuta al
          presionar Submit. Coordina las validaciones de cada
          campo y controla el envio a Formspree.
   Commit: "feat: agrega validacion principal del formulario y envio Formspree"
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contactForm');
  var btnSubmit = document.getElementById('btnSubmit');
  var formStatus = document.getElementById('formStatus');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    /* Limpiar estados previos */
    clearErrors();
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    /* Obtener valores */
    var nombre = document.getElementById('nombre').value.trim();
    var email = document.getElementById('email').value.trim();
    var telefono = document.getElementById('telefono').value.trim();
    var mensaje = document.getElementById('mensaje').value.trim();

    /* Ejecutar validaciones (cada integrante hizo la suya) */
    var isValid = true;

    if (!validateNombre(nombre)) isValid = false;
    if (!validateEmail(email)) isValid = false;
    if (!validateTelefono(telefono)) isValid = false;
    if (!validateMensaje(mensaje)) isValid = false;

    if (!isValid) return;

    /* Enviar a Formspree - Chris */
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
          formStatus.textContent = '¡Mensaje enviado con éxito! Te responderemos pronto.';
          formStatus.className = 'form-status success';
          form.reset();
        } else {
          formStatus.textContent = 'Hubo un error al enviar. Inténtalo de nuevo.';
          formStatus.className = 'form-status error';
        }
      })
      .catch(function () {
        formStatus.textContent = 'Error de conexión. Verifica tu internet e inténtalo de nuevo.';
        formStatus.className = 'form-status error';
      })
      .finally(function () {
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Enviar mensaje';
      });
  });
});

/* FIN seccion de Chris */


/* ============================================================
   INTEGRANTE 8: ALEX (Alejandro Gonzalez)
   Branch: Christian-Hernandez
   Tarea: Validacion del campo Nombre. Debe tener al menos
          3 caracteres y solo letras y espacios.
   Commit: "feat: agrega validacion del campo nombre"
   ============================================================ */

function validateNombre(value) {
  var errorEl = document.getElementById('error-nombre');
  var inputEl = document.getElementById('nombre');

  if (value === '') {
    showError(inputEl, errorEl, 'El nombre es obligatorio.');
    return false;
  }
  if (value.length < 3) {
    showError(inputEl, errorEl, 'El nombre debe tener al menos 3 caracteres.');
    return false;
  }
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(value)) {
    showError(inputEl, errorEl, 'El nombre solo puede contener letras y espacios.');
    return false;
  }
  return true;
}

/* FIN seccion de Alex */


/* ============================================================
   INTEGRANTE 9: DANIEL (Daniel Aguilar)
   Branch: Christian-Hernandez
   Tarea: Validacion del campo Correo electronico con
          expresion regular para formato valido.
   Commit: "feat: agrega validacion del campo correo electronico"
   ============================================================ */

function validateEmail(value) {
  var errorEl = document.getElementById('error-email');
  var inputEl = document.getElementById('email');
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value === '') {
    showError(inputEl, errorEl, 'El correo electrónico es obligatorio.');
    return false;
  }
  if (!emailRegex.test(value)) {
    showError(inputEl, errorEl, 'Ingresa un correo electrónico válido.');
    return false;
  }
  return true;
}

/* FIN seccion de Daniel */


/* ============================================================
   INTEGRANTE 10: EDUARDO (Eduardo Villedas)
   Branch: Christian-Hernandez
   Tarea: Validacion del campo Telefono. Acepta numeros,
          espacios, parentesis y guiones. Minimo 10 digitos.
   Commit: "feat: agrega validacion del campo telefono"
   ============================================================ */

function validateTelefono(value) {
  var errorEl = document.getElementById('error-telefono');
  var inputEl = document.getElementById('telefono');
  var digits = value.replace(/\D/g, '');

  if (value === '') {
    showError(inputEl, errorEl, 'El teléfono es obligatorio.');
    return false;
  }
  if (!/^[\d\s()+-]+$/.test(value)) {
    showError(inputEl, errorEl, 'El teléfono solo puede contener números, espacios, paréntesis y guiones.');
    return false;
  }
  if (digits.length < 10) {
    showError(inputEl, errorEl, 'El teléfono debe tener al menos 10 dígitos.');
    return false;
  }
  return true;
}

/* FIN seccion de Eduardo */


/* ============================================================
   INTEGRANTE 11: ANGEL (Angel Juarez)
   Branch: Christian-Hernandez
   Tarea: Validacion del campo Mensaje. Debe tener al menos
          10 caracteres para asegurar un mensaje con contenido.
   Commit: "feat: agrega validacion del campo mensaje"
   ============================================================ */

function validateMensaje(value) {
  var errorEl = document.getElementById('error-mensaje');
  var inputEl = document.getElementById('mensaje');

  if (value === '') {
    showError(inputEl, errorEl, 'El mensaje es obligatorio.');
    return false;
  }
  if (value.length < 10) {
    showError(inputEl, errorEl, 'El mensaje debe tener al menos 10 caracteres.');
    return false;
  }
  return true;
}

/* FIN seccion de Angel */


/* ============================================================
   INTEGRANTE 12: VICTOR (Victor Hernandez)
   Branch: Christian-Hernandez
   Tarea: Funciones auxiliares showError y clearErrors para
          mostrar/limpiar mensajes de error y clases CSS.
   Commit: "feat: agrega funciones auxiliares de error del formulario"
   ============================================================ */

function showError(inputEl, errorEl, message) {
  inputEl.classList.add('input-error');
  errorEl.textContent = message;
}

function clearErrors() {
  var errorMsgs = document.querySelectorAll('.error-msg');
  var inputs = document.querySelectorAll('.form-group input, .form-group textarea');

  for (var i = 0; i < errorMsgs.length; i++) {
    errorMsgs[i].textContent = '';
  }
  for (var j = 0; j < inputs.length; j++) {
    inputs[j].classList.remove('input-error');
  }
}

/* FIN seccion de Victor */
