//Crear 10 objetos en JavaScript y almacenarlos en local  
                             
// 1. Definición del arreglo de productos (La base de datos del ecommerce)
const productos = [
    {
        id: 1,
        nombre: "Vino Tinto",
        categoria: "Vinos",
        precio: 650,
        stock: 10,
        descripcion: "Casa Madero 3V: Mezcla de Cabernet Sauvignon, Merlot y Tempranillo.",
        imagen: "🍷"
    },
    {
        id: 2,
        nombre: "Vino Blanco",
        categoria: "Vinos",
        precio: 580,
        stock: 12,
        descripcion: "Monte Xanic Chardonnay: Notas de manzana verde, piña y toques florales.",
        imagen: "🥂"
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
        imagen: "❤️"
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