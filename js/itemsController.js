//Crear 10 objetos en JavaScript y almacenarlos en local  
                             
// 1. Definición del arreglo de productos (La base de datos del ecommerce)
const productos = [
    {
        id: 1,
        nombre: "Tabla picnic",
        categoria: "Tablas",
        precio: 1200,
        stock: 10,
        descripcion: "2 quesos maduros: queso Philadelphia con nuez, queso manchego Semi-Curado\n2 carnes frías: jamón serrano, salami seco estilo italiano\nFrutas de temporada\nGalletas integrales\nMermelada de higos\nAlmendras y pretzel de chocolate ",
        imagen: "img/Productos/Tabla picnic.jpeg"
    },
    {
        id: 2,
        nombre: "Kit Pareja",
        categoria: "Kits",
        precio: 990,
        stock: 12,
        descripcion: `Incluye:
        • 2 Carnes frías: Jamón serrano, Pepperoni
        • 2 Quesos: Queso manchego, Queso Philadelphia con nuez
        • Frutas de temporada: Dátiles, Almendras, Pretzel de chocolate
        • Galletas integrales
        • Botella de vino
        • 2 Copas de vidrio`,
        imagen: "img/Productos/Kit Pareja.jpeg"
    },
    {
        id: 3,
        nombre: "Vino Rosado",
        categoria: "Vinos",
        precio: 690,
        stock: 8,
        descripcion: "L.A. Cetto Rosado: Refrescante con notas de fresa y frambuesa.",
        imagen: "🌸"
    },
    {
        id: 4,
        nombre: "Tabla Picnic",
        categoria: "Tablas",
        precio: 1200,
        stock: 5,
        descripcion: "Ideal para 4-6 personas. Incluye quesos maduros, carnes frías y frutos secos.",
        imagen: "🧺"
    },
    {
        id: 5,
        nombre: "Kit Pareja",
        categoria: "Tablas",
        precio: 990,
        stock: 15,
        descripcion: "Experiencia romántica: Incluye botella de vino, quesos y 2 copas de vidrio.",
        imagen: " "
    },
    {
        id: 6,
        nombre: "Individual Grazing Box",
        categoria: "Tablas",
        precio: 190,
        stock: 20,
        descripcion: "Snack premium personal con jamón serrano, uvas, dátil y quesos.",
        imagen: "🧀"
    },
    {
        id: 7,
        nombre: "Queso Manchego Curado",
        categoria: "Quesos",
        precio: 350,
        stock: 10,
        descripcion: "Queso artesanal de oveja con 6 meses de maduración.",
        imagen: "🔪"
    },
    {
        id: 8,
        nombre: "Jamón Serrano Reserva",
        categoria: "Carnes",
        precio: 420,
        stock: 7,
        descripcion: "Sobre de 100g de jamón serrano reserva de corte fino.",
        imagen: "🍖"
    },
    {
        id: 9,
        nombre: "Mermelada de Higo",
        categoria: "Complementos",
        precio: 145,
        stock: 25,
        descripcion: "Mermelada artesanal perfecta para maridar con quesos fuertes.",
        imagen: "🍯"
    },
    {
        id: 10,
        nombre: "Pan de Masa Madre",
        categoria: "Complementos",
        precio: 95,
        stock: 30,
        descripcion: "Hogaza artesanal de masa madre, corteza crujiente y miga suave.",
        imagen: "🥖"
    }
];

/**
 * 2. PERSISTENCIA DE DATOS
 * Guardamos el arreglo convertido a STRING en el LocalStorage.
 * Esto permite que 'index.js' pueda leerlo aunque estemos en archivos diferentes.
 */
localStorage.setItem("productos", JSON.stringify(productos));

// Mensaje de control para la consola (puedes borrarlo después)
console.log("Productos cargados exitosamente en LocalStorage.");