let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productos = [
  { id: 1, nombre: "----", precio: 00.00, imagen: "--/--.--" },
  { id: 2, nombre: "----", precio: 00.00, imagen: "--/--.--" },
  { id: 3, nombre: "----", precio: 00.00, imagen: "--/--.--" },
  { id: 4, nombre: "----", precio: 00.00, imagen: "--/--.--" },
  { id: 5, nombre: "----", precio: 00.00, imagen: "--/--.--" },
  { id: 6, nombre: "----", precio: 00.00, imagen: "--/--.--" },
  { id: 7, nombre: "----", precio: 00.00, imagen: "--/--.--" },
  { id: 8, nombre: "----", precio: 00.00, imagen: "--/--.--" },
  { id: 9, nombre: "----", precio: 00.00, imagen: "--/--.--" },
  { id: 10, nombre: "----", precio: 00.00, imagen: "--/--.--" }
];


function renderProductos(lista) {
  const contenedor = document.querySelector('.grid-products');
  if(!contenedor) return;
  contenedor.innerHTML = "";