-- Estas son las tablas que se crean en la base de datos de microservicio-tareas
-- Unicamente para fines de desarrollo y pruebas

CREATE TABLE IF NOT EXISTS Sedes (
    idSede INT AUTO_INCREMENT PRIMARY KEY,
    uuidSede VARCHAR(36) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) DEFAULT '',
    --
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_uuidSede (uuidSede)
);

CREATE TABLE IF NOT EXISTS Habitaciones (
    idHabitacion INT AUTO_INCREMENT PRIMARY KEY,
    numeroHabitacion INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    idSede INT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    --
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_idSede (idSede),
    UNIQUE (numeroHabitacion, idSede), -- Un numero de habitacion por sede
    FOREIGN KEY (idSede) REFERENCES Sedes(idSede)
);

CREATE TABLE IF NOT EXISTS Residentes (
    idResidente INT AUTO_INCREMENT PRIMARY KEY,
    uuidResidente VARCHAR(36) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) DEFAULT '',
    correo VARCHAR(50) DEFAULT '',
    cedula VARCHAR(20) NOT NULL,
    idSede INT NOT NULL,
    idHabitacion INT NULL,
    activo BOOLEAN DEFAULT TRUE,
    --
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_idSede (idSede),
    INDEX idx_uuidResidente (uuidResidente),
    INDEX idx_cedula (cedula),
    INDEX idx_correo (correo),
    UNIQUE (idHabitacion), -- Un residente por habitacion, los que no tienen habitacion el valor es NULL
    FOREIGN KEY (idSede) REFERENCES Sedes(idSede),
    FOREIGN KEY (idHabitacion) REFERENCES Habitaciones(idHabitacion)
);

CREATE TABLE IF NOT EXISTS Pagos (
    idPago INT AUTO_INCREMENT PRIMARY KEY,
    uuidPago VARCHAR(36) NOT NULL,
    idResidente INT NOT NULL,
    idHabitacion INT NOT NULL,
    idSede INT NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    --
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_idResidente (idResidente),
    INDEX idx_idSede (idSede),
    INDEX idx_uuidPago (uuidPago),
    INDEX idx_idHabitacion (idHabitacion),
    FOREIGN KEY (idResidente) REFERENCES Residentes(idResidente),
    FOREIGN KEY (idSede) REFERENCES Sedes(idSede)
);

