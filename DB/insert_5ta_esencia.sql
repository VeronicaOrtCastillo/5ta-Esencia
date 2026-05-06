USE quinta_esencia;

-- USUARIOS --
INSERT INTO usuarios (nombre, apellido, correo, telefono, contrasena, rol, fecha_registro)
VALUES ("Vero", "Ortiz", "desafiar@admin.com", "5574986321", "raton2", "administrador", NOW()),
("Victor", "Hernandez", "vinos@queso.com", "5521478963", "JaCaLiTo33", "administrador", NOW()),
("Eduardo", "Villedas", "queso@vinos.com", "5541236985", "koko124LOCO", "administrador", NOW()),
("Jahel", "Instructora", "Jahel@ruleta.com", "5525369878", "rULET45", "usuario", NOW()),
("Pedro", "Perez", "Perez@pedro.com", "5525369685", "generation#", "usuario", NOW());

-- CATEGORIAS --
INSERT INTO categorias (nombre) VALUES
('Tablas'),
('Kits'),
('Individual'),
('Vinos'),
('Extras');

-- PRODUCTOS --
INSERT INTO productos (nombre, descripcion, precio, stock, id_categoria) VALUES
('Tabla Picnic', 
'Incluye:
- 2 quesos maduros: queso Philadelphia con nuez, queso manchego semi-curado
- 2 carnes frías: jamón serrano, salami italiano
- Frutas de temporada
- Galletas integrales
- Mermelada de higos
- Almendras y pretzel de chocolate',
1200, 10, 1),

('Kit Pareja',
'Incluye:
- 2 carnes frías: jamón serrano, pepperoni
- 2 quesos: manchego, Philadelphia con nuez
- Frutas de temporada: dátiles, almendras
- Galletas integrales
- Botella de vino
- 2 copas de vidrio',
990, 12, 2),

('Individual Grazing Box',
'Incluye:
- Queso Philadelphia con nuez
- Queso manchego
- Chorizo español
- Jamón serrano
- Uvas
- Dátiles
- Almendras
- Galletas integrales y pretzel de chocolate',
190, 8, 3),

('Rioja Reserva',
'Vino tinto español con crianza en barrica, notas de frutos rojos, vainilla y especias. Ideal para carnes rojas y quesos curados.',
190, 20, 4),

('Red Bouquet',
'Incluye:
- Globo esfera roja con texto personalizado
- 2 corazones metálicos con helio',
465, 20, 5);

-- CARRITO --
INSERT INTO carrito (id_usuario) VALUES
(1),
(2),
(3),
(4),
(5);

-- DETALLE CARRITO --
INSERT INTO detalle_carrito (id_carrito, id_producto, cantidad, precio_unitario) VALUES
(1, 1, 1, 1200.00),
(2, 2, 1, 990.00),
(3, 3, 2, 190.00),
(4, 4, 1, 190.00),
(5, 5, 3, 465.00);

-- PEDIDO --
INSERT INTO pedidos (id_usuario, total, estado) VALUES
(1, 1200.00, 'pendiente'),
(2, 990.00, 'pagado'),
(3, 380.00, 'enviado'),
(4, 190.00, 'cancelado'),
(5, 1395.00, 'pendiente');

-- DETALLE PEDIDO --
INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario, subtotal) VALUES
(1, 1, 1, 1200.00, 1200.00),
(2, 2, 1, 990.00, 990.00),
(3, 3, 2, 190.00, 380.00),
(4, 4, 1, 190.00, 190.00),
(5, 5, 3, 465.00, 1395.00);

-- CONTACTO --
INSERT INTO contacto (nombre, correo, mensaje, id_usuario) VALUES
('Vero', 'vero@mail.com', 'Soy cliente registrada', 1),
('Maria Perez', 'maria@mail.com', 'Tienen envios a domicilio?', NULL),
('Luis Gomez', 'luis@mail.com', 'Me interesa una tabla personalizada', NULL),
('Ana Torres', 'ana@mail.com', 'Cual es su producto mas vendido?', NULL),
('Jorge Ruiz', 'jorge@mail.com', 'Necesito una cotizacion para evento', NULL);

SELECT * FROM usuarios;
SELECT *FROM  categorias;
SELECT *FROM  productos;
SELECT *FROM  carrito;
SELECT *FROM  detalle_carrito;
SELECT *FROM  pedidos;
SELECT *FROM  detalle_pedido;
SELECT *FROM  contacto;
