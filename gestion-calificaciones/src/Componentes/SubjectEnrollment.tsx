import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Toast } from 'primereact/toast';
import axios from 'axios';

const SubjectEnrollment: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<any[]>([]);
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
      console.error('Error fetching students:', error);
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
      console.error('Error fetching subjects:', error);
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las materias' });
    }
  };

  const handleEnrollment = async () => {
    if (selectedStudent && selectedSubjects.length >= 3) {
      try {
        console.log("Selected Student:", selectedStudent);
        console.log("Selected Subjects:", selectedSubjects); // Verifica que estos datos sean correctos
        for (const subject of selectedSubjects) {
          console.log(`Matriculando estudiante ${selectedStudent} en la materia ${subject.value}`); // Debugging
          await axios.post('http://localhost:3001/api/matriculas', {
            id_estudiante: selectedStudent,
            id_materia: subject.value, // Asegúrate de que este sea el ID de la materia
            calificacion: 0, // Calificación inicial
          });
        }
        toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Estudiante matriculado en las materias' });
      } catch (error) {
        console.error('Error en la matriculación:', error);
        toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo completar la matriculación' });
      }
    } else {
      toast.current?.show({ severity: 'warn', summary: 'Advertencia', detail: 'Selecciona al menos tres materias' });
    }
  };
    

  return (
    <div>
      <Toast ref={toast} />
      <h2>Matriculación de Estudiantes</h2>
      <div>
        <Dropdown
          value={selectedStudent}
          options={students}
          onChange={(e) => setSelectedStudent(e.value)}
          placeholder="Selecciona un Estudiante"
        />
      </div>
      <div>
        <MultiSelect
          value={selectedSubjects}
          options={subjects}
          onChange={(e) => setSelectedSubjects(e.value)}
          placeholder="Selecciona Materias"
          display="chip"
        />
      </div>
      <Button label="Matricular" icon="pi pi-check" onClick={handleEnrollment} />
    </div>
  );
};

export default SubjectEnrollment;
