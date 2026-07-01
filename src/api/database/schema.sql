-- =============================================
-- LVTech - Autoservicio de Hardware y Software
-- Script para crear la base de datos
-- =============================================

CREATE DATABASE IF NOT EXISTS LVTech;
USE LVTech;

-- ---------------------------------------------------------
-- Tabla productos
-- category: las DOS categorias principales pedidas por la consigna
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description VARCHAR(255),
    image VARCHAR(255) NOT NULL,
    category ENUM('hardware', 'software') NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1
);

-- ---------------------------------------------------------
-- Tabla ventas
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------
-- Tabla intermedia venta_productos (relacion muchos a muchos)
-- Guardamos unit_price como "foto" del precio al momento de la venta,
-- asi si despues el admin modifica el precio del producto, el historial
-- de ventas viejas no se ve afectado.
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS venta_productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venta_id INT NOT NULL,
    producto_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (venta_id) REFERENCES ventas(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- ---------------------------------------------------------
-- Tabla usuarios
-- password se guardara encriptado con bcrypt (por ahora texto plano)
-- es_admin: distingue administradores de usuarios comunes
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    es_admin TINYINT(1) NOT NULL DEFAULT 0
);

-- Usuario admin de prueba (password sin encriptar, se cambia cuando implementemos bcrypt)
INSERT INTO usuarios (nombre, email, password, es_admin) VALUES
('Admin', 'admin@lvtech.com', '$2a$10$vmfkTWmYO5xpTJ5IOmUv.uFG2rArrWsI/pavWJBV/nFd.utIrQk2G', 1);

-- ---------------------------------------------------------
-- Datos de ejemplo: 7 productos de hardware (perifericos) y
-- 7 de software (licencias). Dos quedan inactivos a proposito
-- para poder probar despues el alta/baja desde el panel admin.
-- ---------------------------------------------------------
INSERT INTO productos (name, description, image, category, price, active) VALUES
('Teclado mecanico RGB', 'Switches rojos, retroiluminado por tecla', 'https://placehold.co/400x400?text=Teclado', 'hardware', 45000.00, 1),
('Mouse inalambrico ergonomico', '6 botones programables, sensor de 16000 DPI', 'https://placehold.co/400x400?text=Mouse', 'hardware', 28000.00, 1),
('Auriculares gamer 7.1', 'Sonido envolvente con microfono retractil', 'https://placehold.co/400x400?text=Auriculares', 'hardware', 35000.00, 1),
('Monitor 24" Full HD 75Hz', 'Panel IPS, bordes finos, entrada HDMI', 'https://placehold.co/400x400?text=Monitor', 'hardware', 180000.00, 1),
('Webcam Full HD 1080p', 'Enfoque automatico, microfono integrado', 'https://placehold.co/400x400?text=Webcam', 'hardware', 32000.00, 1),
('Parlantes Bluetooth 2.0', 'Graves potentes, 10 horas de bateria', 'https://placehold.co/400x400?text=Parlantes', 'hardware', 25000.00, 1),
('Placa de video gama de entrada', '8GB VRAM, ideal para 1080p', 'https://placehold.co/400x400?text=Placa+de+Video', 'hardware', 450000.00, 0),

('Windows 11 Home (licencia digital)', 'Activacion online, 1 equipo', 'https://placehold.co/400x400?text=Windows+11', 'software', 60000.00, 1),
('Microsoft 365 Personal (1 año)', 'Word, Excel, PowerPoint y 1TB en la nube', 'https://placehold.co/400x400?text=Office+365', 'software', 38000.00, 1),
('Antivirus Total Security (1 año)', 'Proteccion para 1 PC durante 12 meses', 'https://placehold.co/400x400?text=Antivirus', 'software', 15000.00, 1),
('Adobe Photoshop (licencia mensual)', 'Edicion de imagenes profesional', 'https://placehold.co/400x400?text=Photoshop', 'software', 22000.00, 1),
('JetBrains All Products Pack (anual)', 'Todos los IDEs de JetBrains por 1 año', 'https://placehold.co/400x400?text=JetBrains', 'software', 95000.00, 1),
('CCleaner Professional', 'Limpieza y optimizacion automatica', 'https://placehold.co/400x400?text=CCleaner', 'software', 9000.00, 1),
('Norton 360 Deluxe', 'Antivirus + VPN incluida', 'https://placehold.co/400x400?text=Norton+360', 'software', 18000.00, 0);
