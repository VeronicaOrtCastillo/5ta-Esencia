//Crear 10 objetos en JavaScript y almacenarlos en local  
// Solo cargar productos iniciales si NO existen aún
if (!localStorage.getItem("productos")) {                              
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
            descripcion: `Ideal para una tarde de pelis con los amigos.
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
            nombre: "Rioja Reserva",
            categoria: "Vinos",
            precio: 190,
            stock: 20,
            descripcion: "Vino tinto español con crianza en barrica, notas de frutos rojos, vainilla y especias. Ideal para carnes rojas y quesos curados.",
            imagen: "img/Productos/1.Rioja Reserva (vino tinto).PNG"
        },
        {
            id: 7,
            nombre: "Ribera del Duero",
            categoria: "Vinos",
            precio: 350,
            stock: 10,
            descripcion: "Vino tinto robusto con cuerpo medio-alto, aromas de frutos negros y roble tostado. Perfecto para acompañar cortes y tablas.",
            imagen: "img/Productos/2. Ribera del Duero (vino tinto).PNG"
        },
        {
            id: 8,
            nombre: "Chianti Classico",
            categoria: "Vinos",
            precio: 450,
            stock: 9,
            descripcion: "Vino tinto italiano equilibrado con notas de frutos rojos maduros, hierbas secas y un toque de roble. Ideal con pastas, quesos curados y carnes asadas.",
            imagen: "img/Productos/3. Chianti Classico (vino tinto).PNG"
        },
        {
            id: 9,
            nombre: "Albariño",
            categoria: "Vinos",
            precio: 145,
            stock: 25,
            descripcion: "Vino blanco gallego fresco y aromático, notas cítricas y florales con final mineral. Perfecto para mariscos, pescados y tablas ligeras.",
            imagen: "img/Productos/4. Albariño (vino blanco).PNG"
        },
        {
            id: 10,
            nombre: "Sweet Red",
            categoria: "Vinos",
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
}