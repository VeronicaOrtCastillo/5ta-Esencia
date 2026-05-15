/* SCRIPT GENERAL - 5ta Esencia */

/* ================= CONFIG BACKEND ================= */
const API_BASE_URL = "http://localhost:8080";
const API_URL = `${API_BASE_URL}/api`;
const AUTH_URL = `${API_BASE_URL}/auth`;

/* ================= SESIÓN ================= */
function obtenerToken() {
  return localStorage.getItem("token");
}

function obtenerCorreo() {
  return localStorage.getItem("correo");
}

function obtenerRol() {
  return localStorage.getItem("rol");
}
function cerrarSesion() {
  localStorage.removeItem("token");
  localStorage.removeItem("correo");
  localStorage.removeItem("rol");

  alert("Sesión cerrada correctamente.");
  window.location.href = "login.html";
}

function esAdministrador() {
  return obtenerRol() === "administrador";
}

function headersAuth() {
  const token = obtenerToken();

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
}

/* ================= DOM CONTENT LOADED ================= */
document.addEventListener("DOMContentLoaded", function () {

  actualizarMenuSesion();

  // ================= ADMIN CONTROLS =================
  const panelAdmin = document.getElementById("admin-panel");
  const adminControls = document.getElementById("admin-controls");

  if (adminControls) {
    adminControls.style.display = esAdministrador() ? "block" : "none";
  }

  if (panelAdmin) {
    panelAdmin.style.display = "none";
  }

  // ================= FORMULARIO ADMIN PRODUCTOS =================
  const formProducto = document.getElementById("formProducto");

  if (formProducto) {
    formProducto.addEventListener("submit", guardarProductoDesdeAdmin);
  }

  // ================= MOSTRAR CARRITO DESDE BACKEND =================
  cargarCarritoDesdeBackend();

  // ================= FORMULARIO DE CONTACTO =================
  const form = document.getElementById("contactForm");
  const btnSubmit = document.getElementById("btnSubmit");
  const formStatus = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      clearErrors();

      if (formStatus) {
        formStatus.textContent = "";
        formStatus.className = "form-status";
      }

      const nombre = document.getElementById("nombre").value.trim();
      const email = document.getElementById("email").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();

      let isValid = true;

      if (!validateNombre(nombre)) isValid = false;
      if (!validateEmail(email)) isValid = false;
      if (!validateTelefono(telefono)) isValid = false;
      if (!validateMensaje(mensaje)) isValid = false;

      if (!isValid) return;

      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.textContent = "Enviando...";
      }

      try {
        const response = await fetch(`${API_URL}/contactos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nombre: nombre,
            correo: email,
            mensaje: `Teléfono: ${telefono}\n\n${mensaje}`
          })
        });

        if (response.ok) {
          if (formStatus) {
            formStatus.textContent = "¡Mensaje enviado con éxito!";
            formStatus.className = "form-status success";
          }

          form.reset();
        } else {
          if (formStatus) {
            formStatus.textContent = "Error al enviar.";
            formStatus.className = "form-status error";
          }
        }

      } catch (error) {
        console.error("Error de conexión:", error);

        if (formStatus) {
          formStatus.textContent = "Error de conexión.";
          formStatus.className = "form-status error";
        }

      } finally {
        if (btnSubmit) {
          btnSubmit.disabled = false;
          btnSubmit.textContent = "Enviar mensaje";
        }
      }
    });
  }

  // ================= MENÚ HAMBURGUESA =================
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("active");
    });
  }

  // ================= CARRUSEL =================
  iniciarCarrusel();
});

/* ================= PRODUCTOS ADMIN BACKEND ================= */

async function guardarProductoDesdeAdmin(e) {
  e.preventDefault();

  const token = obtenerToken();

  if (!token || !esAdministrador()) {
    mostrarAlerta("Debes iniciar sesión como administrador.", "danger");
    return;
  }

  const id = document.getElementById("producto-id").value;
  const nombre = document.getElementById("nombre").value.trim();
  const precio = Number(document.getElementById("precio").value);
  const categoriaNombre = document.getElementById("categoria").value.trim();
  const imagen = document.getElementById("imagen").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();

  if (!nombre || !precio || !categoriaNombre || !descripcion) {
    mostrarAlerta("Completa nombre, precio, categoría y descripción.", "danger");
    return;
  }

  try {
    const categoria = await obtenerOCrearCategoria(categoriaNombre);

    const producto = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      stock: 10,
      imagen: imagen,
      categoria: categoria
    };

    const url = id
      ? `${API_URL}/productos/${id}`
      : `${API_URL}/productos`;

    const metodo = id ? "PUT" : "POST";

    const response = await fetch(url, {
      method: metodo,
      headers: headersAuth(),
      body: JSON.stringify(producto)
    });

    if (!response.ok) {
      console.error("Error al guardar producto:", response.status);
      mostrarAlerta("No se pudo guardar el producto.", "danger");
      return;
    }

    mostrarAlerta(id ? "Producto actualizado" : "Producto agregado", "success");

    document.getElementById("formProducto").reset();
    document.getElementById("producto-id").value = "";

    const panel = document.getElementById("admin-panel");
    if (panel) panel.style.display = "none";

    if (typeof cargarProductosDesdeBackend === "function") {
      cargarProductosDesdeBackend();
    }

  } catch (error) {
    console.error("Error al guardar producto:", error);
    mostrarAlerta("Error de conexión con el backend.", "danger");
  }
}

async function obtenerOCrearCategoria(nombreCategoria) {
  const responseCategorias = await fetch(`${API_URL}/categorias`);
  const categorias = await responseCategorias.json();

  const categoriaExistente = categorias.find(c =>
    c.nombre.toLowerCase() === nombreCategoria.toLowerCase()
  );

  if (categoriaExistente) {
    return categoriaExistente;
  }

  const responseNuevaCategoria = await fetch(`${API_URL}/categorias`, {
    method: "POST",
    headers: headersAuth(),
    body: JSON.stringify({
      nombre: nombreCategoria
    })
  });

  if (!responseNuevaCategoria.ok) {
    throw new Error("No se pudo crear la categoría");
  }

  return await responseNuevaCategoria.json();
}

async function editarProducto(idProducto) {
  const token = obtenerToken();

  if (!token || !esAdministrador()) {
    mostrarAlerta("Debes iniciar sesión como administrador.", "danger");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/productos/${idProducto}`);

    if (!response.ok) {
      mostrarAlerta("No se pudo cargar el producto.", "danger");
      return;
    }

    const producto = await response.json();

    document.getElementById("producto-id").value = producto.id_producto;
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("categoria").value = producto.categoria ? producto.categoria.nombre : "";
    document.getElementById("imagen").value = producto.imagen || "";
    document.getElementById("descripcion").value = producto.descripcion || "";

    const panel = document.getElementById("admin-panel");

    if (panel) {
      panel.style.display = "block";
      window.scrollTo({ top: panel.offsetTop, behavior: "smooth" });
    }

  } catch (error) {
    console.error("Error al editar producto:", error);
    mostrarAlerta("Error de conexión con el backend.", "danger");
  }
}

async function eliminarProducto(idProducto) {
  const token = obtenerToken();

  if (!token || !esAdministrador()) {
    mostrarAlerta("Debes iniciar sesión como administrador.", "danger");
    return;
  }

  const confirmar = confirm("¿Seguro que deseas eliminar este producto?");

  if (!confirmar) return;

  try {
    const response = await fetch(`${API_URL}/productos/${idProducto}`, {
      method: "DELETE",
      headers: headersAuth()
    });

    if (!response.ok) {
      console.error("Error al eliminar producto:", response.status);
      mostrarAlerta("No se pudo eliminar el producto.", "danger");
      return;
    }

    mostrarAlerta("Producto eliminado", "danger");

    if (typeof cargarProductosDesdeBackend === "function") {
      cargarProductosDesdeBackend();
    }

  } catch (error) {
    console.error("Error al eliminar producto:", error);
    mostrarAlerta("Error de conexión con el backend.", "danger");
  }
}

/* ================= CARRITO BACKEND ================= */

/* ================= PRODUCTOS ADMIN BACKEND ================= */

async function guardarProductoDesdeAdmin(e) {
  e.preventDefault();

  const token = obtenerToken();

  if (!token) {
    mostrarAlerta("Debes iniciar sesión como administrador.", "danger");
    return;
  }

  if (!esAdministrador()) {
    mostrarAlerta("Tu usuario no tiene permisos de administrador.", "danger");
    return;
  }

  const id = document.getElementById("producto-id").value;
  const nombre = document.getElementById("nombre").value.trim();
  const precio = Number(document.getElementById("precio").value);
  const categoriaNombre = document.getElementById("categoria").value.trim();
  const imagen = document.getElementById("imagen").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();

  if (!nombre || !precio || !categoriaNombre || !descripcion) {
    mostrarAlerta("Completa nombre, precio, categoría y descripción.", "danger");
    return;
  }

  try {
    const categoria = await obtenerOCrearCategoria(categoriaNombre);

    const producto = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      stock: 10,
      imagen: imagen,
      categoria: {
        id_categoria: categoria.id_categoria,
        nombre: categoria.nombre
      }
    };

    const url = id
      ? `${API_URL}/productos/${id}`
      : `${API_URL}/productos`;

    const metodo = id ? "PUT" : "POST";

    console.log("Producto a guardar:", producto);
    console.log("URL:", url);
    console.log("Método:", metodo);
    console.log("Rol:", obtenerRol());

    const response = await fetch(url, {
      method: metodo,
      headers: headersAuth(),
      body: JSON.stringify(producto)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error al guardar producto:", response.status, errorText);
      mostrarAlerta(`No se pudo guardar el producto. Error ${response.status}`, "danger");
      return;
    }

    mostrarAlerta(id ? "Producto actualizado" : "Producto agregado", "success");

    document.getElementById("formProducto").reset();
    document.getElementById("producto-id").value = "";

    const panel = document.getElementById("admin-panel");
    if (panel) panel.style.display = "none";

    if (typeof cargarProductosDesdeBackend === "function") {
      cargarProductosDesdeBackend();
    }

  } catch (error) {
    console.error("Error al guardar producto:", error);
    mostrarAlerta(error.message || "Error de conexión con el backend.", "danger");
  }
}

async function obtenerOCrearCategoria(nombreCategoria) {
  const responseCategorias = await fetch(`${API_URL}/categorias`, {
    method: "GET"
  });

  if (!responseCategorias.ok) {
    const errorText = await responseCategorias.text();
    console.error("Error al obtener categorías:", responseCategorias.status, errorText);
    throw new Error("No se pudieron cargar las categorías.");
  }

  const categorias = await responseCategorias.json();

  const categoriaExistente = categorias.find(c =>
    c.nombre.toLowerCase() === nombreCategoria.toLowerCase()
  );

  if (categoriaExistente) {
    return categoriaExistente;
  }

  const responseNuevaCategoria = await fetch(`${API_URL}/categorias`, {
    method: "POST",
    headers: headersAuth(),
    body: JSON.stringify({
      nombre: nombreCategoria
    })
  });

  if (!responseNuevaCategoria.ok) {
    const errorText = await responseNuevaCategoria.text();
    console.error("Error al crear categoría:", responseNuevaCategoria.status, errorText);
    throw new Error(`No se pudo crear la categoría. Error ${responseNuevaCategoria.status}`);
  }

  return await responseNuevaCategoria.json();
}

async function editarProducto(idProducto) {
  const token = obtenerToken();

  if (!token) {
    mostrarAlerta("Debes iniciar sesión como administrador.", "danger");
    return;
  }

  if (!esAdministrador()) {
    mostrarAlerta("Tu usuario no tiene permisos de administrador.", "danger");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/productos/${idProducto}`, {
      method: "GET"
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error al cargar producto:", response.status, errorText);
      mostrarAlerta(`No se pudo cargar el producto. Error ${response.status}`, "danger");
      return;
    }

    const producto = await response.json();

    document.getElementById("producto-id").value = producto.id_producto;
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("categoria").value = producto.categoria ? producto.categoria.nombre : "";
    document.getElementById("imagen").value = producto.imagen || "";
    document.getElementById("descripcion").value = producto.descripcion || "";

    const panel = document.getElementById("admin-panel");

    if (panel) {
      panel.style.display = "block";
      window.scrollTo({ top: panel.offsetTop, behavior: "smooth" });
    }

  } catch (error) {
    console.error("Error al editar producto:", error);
    mostrarAlerta("Error de conexión con el backend.", "danger");
  }
}

async function eliminarProducto(idProducto) {
  const token = obtenerToken();

  if (!token) {
    mostrarAlerta("Debes iniciar sesión como administrador.", "danger");
    return;
  }

  if (!esAdministrador()) {
    mostrarAlerta("Tu usuario no tiene permisos de administrador.", "danger");
    return;
  }

  const confirmar = confirm("¿Seguro que deseas eliminar este producto?");

  if (!confirmar) return;

  try {
    console.log("Eliminando producto:", idProducto);
    console.log("Rol:", obtenerRol());

    const response = await fetch(`${API_URL}/productos/${idProducto}`, {
      method: "DELETE",
      headers: headersAuth()
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error al eliminar producto:", response.status, errorText);
      mostrarAlerta(`No se pudo eliminar el producto. Error ${response.status}`, "danger");
      return;
    }

    mostrarAlerta("Producto eliminado", "danger");

    if (typeof cargarProductosDesdeBackend === "function") {
      cargarProductosDesdeBackend();
    }

  } catch (error) {
    console.error("Error al eliminar producto:", error);
    mostrarAlerta("Error de conexión con el backend.", "danger");
  }
}


/* ================= CARRUSEL ================= */

function iniciarCarrusel() {
  const slides = document.querySelectorAll(".carousel-slide");
  let currentSlide = 0;

  if (slides.length === 0) return;

  setInterval(() => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, 4000);
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

/* ================= TOGGLE FORM ADMIN ================= */

function toggleFormulario() {
  const panel = document.getElementById("admin-panel");

  if (!panel) return;

  if (panel.style.display === "none" || panel.style.display === "") {
    panel.style.display = "block";
  } else {
    panel.style.display = "none";
  }
}

/* ================= VALIDACIONES ================= */

function validateNombre(value) {
  const errorEl = document.getElementById("error-nombre");
  const inputEl = document.getElementById("nombre");

  if (value === "" || value.length < 3) {
    showError(inputEl, errorEl, "Nombre inválido");
    return false;
  }

  return true;
}

function validateEmail(value) {
  const errorEl = document.getElementById("error-email");
  const inputEl = document.getElementById("email");
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(value)) {
    showError(inputEl, errorEl, "Correo inválido");
    return false;
  }

  return true;
}

function validateTelefono(value) {
  const errorEl = document.getElementById("error-telefono");
  const inputEl = document.getElementById("telefono");
  const digits = value.replace(/\D/g, "");

  if (digits.length < 10) {
    showError(inputEl, errorEl, "Teléfono inválido");
    return false;
  }

  return true;
}

function validateMensaje(value) {
  const errorEl = document.getElementById("error-mensaje");
  const inputEl = document.getElementById("mensaje");

  if (value.length < 10) {
    showError(inputEl, errorEl, "Mensaje muy corto");
    return false;
  }

  return true;
}

/* ================= MANEJO DE ERRORES ================= */

function showError(inputEl, errorEl, message) {
  if (inputEl) inputEl.classList.add("input-error");
  if (errorEl) errorEl.textContent = message;
}

function clearErrors() {
  const errors = document.querySelectorAll(".error-msg");
  const inputs = document.querySelectorAll("input, textarea");

  errors.forEach(e => e.textContent = "");
  inputs.forEach(i => i.classList.remove("input-error"));
}

function actualizarMenuSesion() {
  const nav = document.getElementById("nav");

  if (!nav) return;

  const token = obtenerToken();
  const correo = obtenerCorreo();

  const loginLink = nav.querySelector('a[href="login.html"]');

  if (token && loginLink) {
    loginLink.textContent = "Cerrar sesión";
    loginLink.href = "#";
    loginLink.onclick = function (e) {
      e.preventDefault();
      cerrarSesion();
    };
  }

  if (token && correo) {
    const usuarioSpan = document.createElement("span");
    usuarioSpan.classList.add("usuario-nav");
    usuarioSpan.textContent = correo;

    const yaExisteUsuario = nav.querySelector(".usuario-nav");

    if (!yaExisteUsuario) {
      nav.insertBefore(usuarioSpan, loginLink);
    }
  }
}