CREATE DATABASE Quinta_Esencia;

USE Quinta_Esencia;

-- USUARIOS --
CREATE TABLE usuarios (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE,
  telefono VARCHAR(15) NOT NULL,
  contrasena VARCHAR(255) NOT NULL,
  rol ENUM('administrador', 'usuario') NOT NULL,
  fecha_registro DATETIME(6) 
);

-- CATEGORIAS --
CREATE TABLE categorias (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(45) NOT NULL
);

-- PRODUCTOS --
CREATE TABLE productos (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  descripcion VARCHAR(500) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  id_categoria INT NOT NULL,
  
  FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- CARRITO --
CREATE TABLE carrito (
    id_carrito INT AUTO_INCREMENT PRIMARY KEY,
	id_usuario INT NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    
	FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- DETALLE CARRITO --
CREATE TABLE detalle_carrito (
    id_detalle_carrito INT AUTO_INCREMENT PRIMARY KEY,
    id_carrito INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
	precio_unitario DECIMAL(10,2) NOT NULL,
    
    FOREIGN KEY (id_carrito) REFERENCES carrito(id_carrito),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- PEDIDO --
CREATE TABLE pedidos (
  id_pedido INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2) NOT NULL,
  estado ENUM('pendiente', 'pagado', 'enviado', 'cancelado') NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- DETALLE PEDIDO --
CREATE TABLE detalle_pedido (
id_detalle_pedido INT AUTO_INCREMENT PRIMARY KEY,
id_pedido INT NOT NULL,
id_producto INT NOT NULL,
cantidad INT NOT NULL,
precio_unitario DECIMAL(10,2) NOT NULL,
subtotal DECIMAL(10,2) NOT NULL,

FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- CONTACTO --
CREATE TABLE contacto (
  id_contacto INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  mensaje VARCHAR(300) NOT NULL,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP
);
