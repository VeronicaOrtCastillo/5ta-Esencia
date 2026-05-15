/* ITEMS CONTROLLER - PRODUCTOS DESDE BACKEND */

/* ================= CONFIG ================= */
const API_PRODUCTOS_URL = "http://localhost:8080/api/productos";

/* ================= CARGAR PRODUCTOS ================= */
document.addEventListener("DOMContentLoaded", function () {
  cargarProductosDesdeBackend();
});

async function cargarProductosDesdeBackend() {
  const contenedor = document.getElementById("contenedor-productos");

  if (!contenedor) return;

  try {
    const response = await fetch(API_PRODUCTOS_URL, {
      method: "GET"
    });

    if (!response.ok) {
      console.error("Error al cargar productos:", response.status);
      contenedor.innerHTML = "<p>No se pudieron cargar los productos.</p>";
      return;
    }

    const productos = await response.json();

    contenedor.innerHTML = "";

    productos.forEach(producto => {
      const idProducto = producto.id_producto;
      const nombreCategoria = producto.categoria ? producto.categoria.nombre : "";
      const imagenProducto = producto.imagen || "";

      const imagenHTML =
        imagenProducto.includes("http") || imagenProducto.includes("img/")
          ? `<img src="${imagenProducto}" alt="${producto.nombre}" class="producto-img-media">`
          : `<div class="img-placeholder">${imagenProducto}</div>`;

      const card = document.createElement("article");
      card.classList.add("producto-card");

      card.innerHTML = `
        <div class="producto-img">
          ${imagenHTML}
        </div>

        <h4 class="producto-nombre">${producto.nombre}</h4>

        ${nombreCategoria ? `<p class="producto-categoria-tag">${nombreCategoria}</p>` : ""}

        <p class="producto-desc">${producto.descripcion || ""}</p>

        <p class="producto-precio">
          $${Number(producto.precio).toLocaleString()} MXN
        </p>

        ${
          localStorage.getItem("rol") === "administrador"
            ? `
              <button onclick="editarProducto(${idProducto})" class="btn-edit">
                Editar
              </button>

              <button onclick="eliminarProducto(${idProducto})" class="btn-delete">
                Eliminar
              </button>
            `
            : ""
        }

        <button class="btn-comprar" onclick="agregarAlCarrito(${idProducto})">
          Agregar al carrito
        </button>
      `;

      contenedor.appendChild(card);
    });

  } catch (error) {
    console.error("Error de conexión al cargar productos:", error);
    contenedor.innerHTML = "<p>Error de conexión con el backend.</p>";
  }
}

/* ================= AGREGAR AL CARRITO ================= */
async function agregarAlCarrito(idProducto) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Debes iniciar sesión para agregar productos al carrito.");
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/api/carrito/agregar/${idProducto}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      console.error("Error al agregar producto:", response.status);
      alert("No se pudo agregar el producto al carrito.");
      return;
    }

    alert("Producto agregado al carrito 🛒");

  } catch (error) {
    console.error("Error de conexión al agregar producto:", error);
    alert("Error de conexión con el backend.");
  }
}