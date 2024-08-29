import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import axios from 'axios';

const GradeRegistration: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
  const [calificacion, setCalificacion] = useState('');
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const toast = React.useRef<Toast>(null);

  useEffect(() => {
    fetchStudents();
    fetchSubjects();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/estudiantes');
      setStudents(response.data.map((student: any) => ({
        label: `${student.nombre} ${student.apellido}`,
        value: student.id_estudiante,
      })));
    } catch (error) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los estudiantes' });
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/materias');
      setSubjects(response.data.map((subject: any) => ({
        label: subject.nombre_materia,
        value: subject.id_materia,
      })));
    } catch (error) {
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las materias' });
    }
  };

  const handleSubmit = async () => {
    if (selectedStudent && selectedSubject && calificacion) {
      try {
        await axios.put(`http://localhost:3001/api/matriculas/${selectedStudent}/${selectedSubject}`, {
          calificacion: parseFloat(calificacion),
        });
        toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Calificación registrada' });
      } catch (error) {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo registrar la calificación' });
      }
    } else {
      toast.current?.show({ severity: 'warn', summary: 'Advertencia', detail: 'Completa todos los campos' });
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <h2>Registro de Calificaciones</h2>
      <div>
        <Dropdown
          value={selectedStudent}
          options={students}
          onChange={(e) => setSelectedStudent(e.value)}
          placeholder="Selecciona un Estudiante"
        />
      </div>
      <div>
        <Dropdown
          value={selectedSubject}
          options={subjects}
          onChange={(e) => setSelectedSubject(e.value)}
          placeholder="Selecciona una Materia"
        />
      </div>
      <div>
        <span className="p-float-label">
          <InputText id="calificacion" value={calificacion} onChange={(e) => setCalificacion(e.target.value)} />
          <label htmlFor="calificacion">Calificación</label>
        </span>
      </div>
      <Button label="Registrar Calificación" icon="pi pi-check" onClick={handleSubmit} />
    </div>
  );
};

export default GradeRegistration;
