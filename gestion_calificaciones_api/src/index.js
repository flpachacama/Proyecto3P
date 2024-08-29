const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123',
  database: 'gestion_calificaciones'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});

// Rutas para Estudiantes
app.get('/api/estudiantes', (req, res) => {
  db.query('SELECT * FROM Estudiante', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/estudiantes', (req, res) => {
  const { nombre, apellido, numero_identificacion } = req.body;
  db.query('INSERT INTO Estudiante (nombre, apellido, numero_identificacion) VALUES (?, ?, ?)', 
  [nombre, apellido, numero_identificacion], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId });
  });
});

app.put('/api/estudiantes/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, numero_identificacion } = req.body;
  db.query('UPDATE Estudiante SET nombre = ?, apellido = ?, numero_identificacion = ? WHERE id_estudiante = ?', 
  [nombre, apellido, numero_identificacion, id], (err, results) => {
    if (err) throw err;
    res.json({ affectedRows: results.affectedRows });
  });
});

app.delete('/api/estudiantes/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Estudiante WHERE id_estudiante = ?', [id], (err, results) => {
    if (err) throw err;
    res.json({ affectedRows: results.affectedRows });
  });
});

// Rutas para Materias
app.get('/api/materias', (req, res) => {
  db.query('SELECT * FROM Materia', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/materias', (req, res) => {
  const { nombre_materia } = req.body;
  db.query('INSERT INTO Materia (nombre_materia) VALUES (?)', [nombre_materia], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId });
  });
});

app.put('/api/materias/:id', (req, res) => {
  const { id } = req.params;
  const { nombre_materia } = req.body;
  db.query('UPDATE Materia SET nombre_materia = ? WHERE id_materia = ?', 
  [nombre_materia, id], (err, results) => {
    if (err) throw err;
    res.json({ affectedRows: results.affectedRows });
  });
});

app.delete('/api/materias/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Materia WHERE id_materia = ?', [id], (err, results) => {
    if (err) throw err;
    res.json({ affectedRows: results.affectedRows });
  });
});

// Rutas para Matrículas
app.get('/api/matriculas', (req, res) => {
  db.query('SELECT * FROM Matricula', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/matriculas', (req, res) => {
    const { id_estudiante, id_materia, calificacion } = req.body;
    
    if (!id_estudiante || !id_materia) {
      return res.status(400).json({ message: "id_estudiante y id_materia son requeridos" });
    }
  
    const sql = 'INSERT INTO Matricula (id_estudiante, id_materia, calificacion) VALUES (?, ?, ?)';
  
    db.query(sql, [id_estudiante, id_materia, calificacion], (err, results) => {
      if (err) {
        console.error('Error al insertar en la tabla Matricula:', err);
        return res.status(500).send({ message: 'Error al registrar la matrícula', error: err });
      }
      res.json({ id: results.insertId, message: 'Matrícula registrada correctamente' });
    });
  });
  
  app.put('/api/matriculas/:id_estudiante/:id_materia', (req, res) => {
    const { id_estudiante, id_materia } = req.params;
    const { calificacion } = req.body;
    
    const sql = 'UPDATE Matricula SET calificacion = ? WHERE id_estudiante = ? AND id_materia = ?';
    
    db.query(sql, [calificacion, id_estudiante, id_materia], (err, results) => {
      if (err) throw err;
      res.json({ affectedRows: results.affectedRows });
    });
  });
app.delete('/api/matriculas/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Matricula WHERE id_matricula = ?', [id], (err, results) => {
    if (err) throw err;
    res.json({ affectedRows: results.affectedRows });
  });
});

// Rutas para Reportes
app.get('/api/reportes', (req, res) => {
    const sql = `
        SELECT e.id_estudiante, e.nombre, e.apellido, 
               m.nombre_materia, ma.calificacion, r.promedio
        FROM Estudiante e
        JOIN Matricula ma ON e.id_estudiante = ma.id_estudiante
        JOIN Materia m ON ma.id_materia = m.id_materia
        JOIN Reporte r ON e.id_estudiante = r.id_estudiante
        ORDER BY e.id_estudiante;
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/api/reportes', (req, res) => {
  const { id_estudiante, promedio } = req.body;
  db.query('INSERT INTO Reporte (id_estudiante, promedio) VALUES (?, ?)', 
  [id_estudiante, promedio], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId });
  });
});

app.put('/api/reportes/:id', (req, res) => {
  const { id } = req.params;
  const { id_estudiante, promedio } = req.body;
  db.query('UPDATE Reporte SET id_estudiante = ?, promedio = ? WHERE id_reporte = ?', 
  [id_estudiante, promedio, id], (err, results) => {
    if (err) throw err;
    res.json({ affectedRows: results.affectedRows });
  });
});

app.delete('/api/reportes/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Reporte WHERE id_reporte = ?', [id], (err, results) => {
    if (err) throw err;
    res.json({ affectedRows: results.affectedRows });
  });
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
