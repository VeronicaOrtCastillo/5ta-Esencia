/* SCRIPT GENERAL - 5ta Esencia */

/* ==== OBTENER INFORMACION DEL USUSARIO ====*/
/*
  Recuperamos el usuario guardado en LocalStorage.
  Cuando el backend haga login correctamente,
  guardaremos ahí los datos del usuario.
*/
const usuario = JSON.parse(localStorage.getItem("usuario"));

/*
  Verificamos si el usuario tiene rol ADMINISTRADOR.

  El operador ?. evita errores si usuario es null.

  Si el rol es "ADMINISTRADOR":
      esAdmin = true

  Si el rol es "USUARIO" o no existe:
      esAdmin = false
*/
const esAdmin = usuario?.rol === "ADMINISTRADOR";

document.addEventListener('DOMContentLoaded', function () {

  //================= ADMIN CONTROLS =================
  const panelAdmin = document.getElementById("admin-panel"); 
  const adminControls = document.getElementById("admin-controls"); 

  /*
  Si el usuario es administrador:
  mostramos los controles del panel admin.
  */
  if (esAdmin) {
  
    if (adminControls) {
      adminControls.style.display = "block";
    }
  
  } else {
  
    /*
      Si NO es administrador:
      ocultamos completamente:
        - botón agregar producto
        - panel administrador
    */
  
    if (adminControls) {
      adminControls.style.display = "none";
    }
  
    if (panelAdmin) {
      panelAdmin.style.display = "none";
    }
  }
  
  // ================= PRODUCTOS =================
  const contenedor = document.getElementById('contenedor-productos');
  const productosLocal = JSON.parse(localStorage.getItem("productos"));

  if (contenedor && productosLocal) {
    contenedor.innerHTML = "";

    productosLocal.forEach(item => {
      const card = document.createElement('article');
      card.classList.add('producto-card');

      const esRutaImagen = item.imagen.includes('img/') || item.imagen.includes('http');
      
      const contenidoImagen = esRutaImagen
        ? `<img src="${item.imagen}" alt="${item.nombre}" class="producto-img-media">`
        : item.imagen;

      card.innerHTML = `
        <div class="producto-img">${contenidoImagen}</div>
        <h4 class="producto-nombre">${item.nombre}</h4>
        ${item.categoria ? `<p class="producto-categoria-tag">${item.categoria}</p>` : ''}
        <p class="producto-desc">${item.descripcion}</p>
        <p class="producto-precio">$${item.precio.toLocaleString()} MXN</p>

        ${esAdmin ? `
          <button onclick="editarProducto(${item.id})" class="btn-edit">Editar</button>
          <button onclick="eliminarProducto(${item.id})" class="btn-delete">Eliminar</button>
        ` : ""}

        <button class="btn-comprar" onclick="agregarAlCarrito(${item.id})">
          Agregar al carrito
        </button>
      `;

      contenedor.appendChild(card);
    });
  }

    // =================MOSTRAR CARRITO =================

  const contenedorCarrito = document.getElementById("contenedor-carrito");

  if (contenedorCarrito) {

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {

      contenedorCarrito.innerHTML = "<p>Tu carrito está vacío 🛒</p>";

    } else {

      contenedorCarrito.innerHTML = "";

      carrito.forEach(item => {

        const esRutaImagen = item.imagen && (item.imagen.includes('img/') || item.imagen.includes('http'));

        const imagen = esRutaImagen

          ? `<img src="${item.imagen}" alt="${item.nombre}">`

          : `<div class="img-placeholder">${item.imagen}</div>`;

        const card = document.createElement("div");

        card.classList.add("carrito-item");

        card.innerHTML = `

          <div class="carrito-img">

            ${imagen}

          </div>

          <div class="carrito-info">

            <h4>${item.nombre}</h4>

            <p>${item.descripcion || ""}</p>

            <p class="precio">$${item.precio} MXN</p>

          </div>

          <div class="carrito-controles">

            <button onclick="cambiarCantidad(${item.id}, -1)">−</button>

            <span>${item.cantidad}</span>

            <button onclick="cambiarCantidad(${item.id}, 1)">+</button>

            <button class="btn-delete" onclick="eliminarDelCarrito(${item.id})">

              ✕

            </button>

          </div>

        `;
        contenedorCarrito.appendChild(card);
      });
      //TOTAL

      const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

      const totalHTML = document.createElement("div");

      totalHTML.classList.add("carrito-total");

      totalHTML.innerHTML = `

        <h3>Total: $${total} MXN</h3>

        <button class="btn-pagar" onclick="finalizarCompra()">

          Finalizar compra

        </button>

      `;
      contenedorCarrito.appendChild(totalHTML);

    }

  }

  // ================= FORMULARIO ADMIN (CRUD) =================
  const formProducto = document.getElementById("formProducto");
  
  if (formProducto) {
    formProducto.addEventListener("submit", function(e) {
      e.preventDefault();
      
      let productos = JSON.parse(localStorage.getItem("productos")) || [];
      const id = document.getElementById("producto-id").value;
      
      const nuevoProducto = {
        id: id ? Number(id) : Date.now(),
        nombre: document.getElementById("nombre").value,
        precio: Number(document.getElementById("precio").value),
        categoria: document.getElementById("categoria").value,
        descripcion: document.getElementById("descripcion").value,
        imagen: document.getElementById("imagen").value,
      };

      if (id) {
        productos = productos.map(p => p.id == id ? nuevoProducto : p);
        mostrarAlerta("Producto actualizado", "success");
      } else {
        productos.push(nuevoProducto);
        mostrarAlerta("Producto agregado", "success");
      }

      localStorage.setItem("productos", JSON.stringify(productos));
      formProducto.reset();
      document.getElementById("producto-id").value = "";
      
      setTimeout(() => location.reload(), 1000);
    });
  }

  // --- 2. FORMULARIO DE CONTACTO ---
  var form = document.getElementById('contactForm');
  var btnSubmit = document.getElementById('btnSubmit');
  var formStatus = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      clearErrors();
      if(formStatus) {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
      }

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

  // --- 3. MENÚ HAMBURGUESA ---
  var toggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("active");
    });
  }

  // --- 4. FORMULARIO DE LOGIN ---
  var loginForm = document.getElementById('loginForm');
  var loginStatus = document.getElementById('loginStatus');

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      clearErrors();
      if (loginStatus) {
        loginStatus.textContent = '';
        loginStatus.className = 'form-status';
      }

      var emailEl = document.getElementById('login-email');
      var passEl = document.getElementById('login-password');
      var emailErr = document.getElementById('error-login-email');
      var passErr = document.getElementById('error-login-password');

      var email = emailEl.value.trim();
      var pass = passEl.value;
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      var isValid = true;
      if (!emailRegex.test(email)) {
        showError(emailEl, emailErr, 'Correo inválido');
        isValid = false;
      }
      if (pass.length < 6) {
        showError(passEl, passErr, 'Mínimo 6 caracteres');
        isValid = false;
      }
      if (!isValid) return;

      // Sin backend aún: solo feedback visual
      if (loginStatus) {
        loginStatus.textContent = 'Autenticación en desarrollo. Pronto disponible.';
        loginStatus.className = 'form-status success';
      }
    });
  }

  // 🔥 NUEVO: INICIAR CARRUSEL AL CARGAR
  iniciarCarrusel();

});

/* ================= 🛒 FUNCIÓN MODIFICADA ================= */
function agregarAlCarrito(id) {
  //Obtener productos
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  //Buscar producto
  const producto = productos.find(p => p.id === id)
  if (!producto) {
    alert("Producto no encontrado");
    return;
  }
  //Obtener carrito o crear uno
  let carrito = JSON.parse(localStorage.getItem("carrito")) || []
  //Validar si ya existe
  const existe = carrito.find(p => p.id === id)
  if (existe) {
    existe.cantidad += 1; // suma cantidad
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  //Guardar en LocalStorage
  localStorage.setItem("carrito", JSON.stringify(carrito))
  alert("Producto agregado al carrito 🛒");
}

/* =================  FUNCIÓN DEL CARRUSEL ================= */
function iniciarCarrusel() {
  const slides = document.querySelectorAll('.carousel-slide');
  let currentSlide = 0;

  if (slides.length === 0) return;

  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 4000); 
}

// --- FUNCIONES ADMIN ---
function eliminarProducto(id) {
  let productos = JSON.parse(localStorage.getItem("productos"));
  productos = productos.filter(p => p.id !== id);

  localStorage.setItem("productos", JSON.stringify(productos));
  mostrarAlerta("Producto eliminado", "danger");

  setTimeout(() => location.reload(), 1000);
}

function editarProducto(id) {
  const productos = JSON.parse(localStorage.getItem("productos"));
  const producto = productos.find(p => p.id === id);

  document.getElementById("producto-id").value = producto.id;
  document.getElementById("nombre").value = producto.nombre;
  document.getElementById("precio").value = producto.precio;
  document.getElementById("categoria").value = producto.categoria;
  document.getElementById("descripcion").value = producto.descripcion;
  document.getElementById("imagen").value = producto.imagen;

  
  const panel = document.getElementById("admin-panel");
  if (panel) {
    panel.style.display = "block";
  }

  window.scrollTo({ top: panel.offsetTop, behavior: "smooth" });
}

function cambiarCantidad(id, cambio) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito = carrito.map(item => {
    if (item.id === id) {
      item.cantidad += cambio;
      if (item.cantidad < 1) item.cantidad = 1;
    }
    return item;
  });

  localStorage.setItem("carrito", JSON.stringify(carrito));
  location.reload();
}

function eliminarDelCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito = carrito.filter(p => p.id !== id);

  localStorage.setItem("carrito", JSON.stringify(carrito));

  location.reload();
}

function finalizarCompra() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    alert("Tu carrito está vacío 🛒");
    return;
  }

  alert("✅ Compra realizada con éxito. ¡Gracias por tu compra!");

  localStorage.removeItem("carrito");

  location.reload();
}
/* ================= ALERTAS ================= */

function mostrarAlerta(msg, tipo) {
  const alerta = document.getElementById("alerta-admin");

  if (alerta) {
    alerta.innerHTML = `
      <div class="alert alert-${tipo}">
        ${msg}
      </div>
    `;
  }
}

/* ================= TOGGLE FORM ================= */
function toggleFormulario() {
  const panel = document.getElementById("admin-panel");

  if (panel.style.display === "none" || panel.style.display === "") {
    panel.style.display = "block";
  } else {
    panel.style.display = "none";
  }
}

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

/* ================= MANEJO DE ERRORES ================= */

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