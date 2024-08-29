CREATE DATABASE gestion_calificaciones;
USE gestion_calificaciones;

CREATE TABLE Estudiante (
    id_estudiante INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    numero_identificacion VARCHAR(20) UNIQUE
);

CREATE TABLE Materia (
    id_materia INT PRIMARY KEY AUTO_INCREMENT,
    nombre_materia VARCHAR(100)
);

CREATE TABLE Matricula (
    id_matricula INT PRIMARY KEY AUTO_INCREMENT,
    id_estudiante INT,
    id_materia INT,
    calificacion DECIMAL(5,2),
    FOREIGN KEY (id_estudiante) REFERENCES Estudiante(id_estudiante),
    FOREIGN KEY (id_materia) REFERENCES Materia(id_materia)
);

CREATE TABLE Reporte (
    id_reporte INT PRIMARY KEY AUTO_INCREMENT,
    id_estudiante INT,
    promedio DECIMAL(5,2),
    FOREIGN KEY (id_estudiante) REFERENCES Estudiante(id_estudiante)
);

