//Crear 10 objetos en JavaScript y almacenarlos en local  
                             
// 1. Definición del arreglo de productos (La base de datos del ecommerce)
const productos = [
    {
        id: 1,
        nombre: "Tabla Picnic",
        categoria: "Tablas",
        precio: 1200,
        stock: 10,
        descripcion: `Incluye:
        •2 quesos maduros: queso Philadelphia con nuez, queso manchego Semi-Curado
        •2 carnes frías: jamón serrano, salami seco estilo italiano
        •Frutas de temporada
        •Galletas integrales
        •Mermelada de higos
        •Almendras y pretzel de chocolate`,
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
        nombre: "Individual Grazing Box",
        categoria: "1 persona",
        precio: 190,
        stock: 8,
        descripcion: `Incluye:
        • Queso Philadelphia con nuez 
        • Queso manchego 
        • Chorizo español 
        • Jamón serrano 
        • Uvas 
        • Dátil
        • Almendras 
        • Galletas integrales y pretzel de chocolate 
        `,
        imagen: "img/Productos/Individual Grazing Box.jpeg"
    },
    {
        id: 4,
        nombre: "For every ocassion",
        categoria: "Tablas",
        precio: 450,
        stock: 5,
        descripcion: `Ideal para darle ese detalle a tu persona favorita en cualquier ocasión.
        Incluye:
        • Botella de vino tinto
        • Caja colgante con porción pequeña de queso manchego, jamón serrano, fruta)`,

        imagen: "img/Productos/For every ocassion (botella de vino con cajita colgante).png"
    },
    {
        id: 5,
        nombre: "Tabla básica",
        categoria: "Tablas",
        precio: 350,
        stock: 15,
        descripcion: `Ideal para una tarde de pelis con los amigos."
        Incluye: 
         • Queso manchego
        • Jamón serrano 
        • Fruta de temporada
        • Aceitunas
        • Galletas integrales
        • Mermelada de higos.`,
        imagen: "img/Productos/Tabla basica.png"
    },
    {
        id: 6,
        nombre: "Individual Grazing Box",
        categoria: "Tablas",
        precio: 190,
        stock: 20,
        descripcion: "Snack premium personal con jamón serrano, uvas, dátil y quesos.",
        imagen: "img/Productos/1.Rioja Reserva (vino tinto).PNG"
    },
    {
        id: 7,
        nombre: "Queso Manchego Curado",
        categoria: "Quesos",
        precio: 350,
        stock: 10,
        descripcion: "Queso artesanal de oveja con 6 meses de maduración.",
        imagen: "img/Productos/2. Ribera del Duero (vino tinto).PNG"
    },
    {
        id: 8,
        nombre: "Jamón Serrano Reserva",
        categoria: "Carnes",
        precio: 420,
        stock: 7,
        descripcion: "Sobre de 100g de jamón serrano reserva de corte fino.",
        imagen: "img/Productos/3. Chianti Classico (vino tinto).PNG"
    },
    {
        id: 9,
        nombre: "Albariño",
        categoria: "Complementos",
        precio: 145,
        stock: 25,
        descripcion: "vino blanco",
        imagen: "img/Productos/4. Albariño (vino blanco).PNG"
    },
    {
        id: 10,
        nombre: "Sweet Red",
        categoria: "Complementos",
        precio: 189,
        stock: 30,
        descripcion: "Vino tinto dulce con perfil afrutado y equilibrado, destacan notas de frutos rojos maduros y un ligero toque floral. Su suavidad lo hace perfecto para maridar con postres o disfrutarlo ligeramente frío.",
        imagen: "img/Productos/5. Sweet Red (vino dulce).PNG"   
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