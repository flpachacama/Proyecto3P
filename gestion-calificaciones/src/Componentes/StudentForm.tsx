import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import axios from 'axios';

const StudentForm: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
  const toast = React.useRef<Toast>(null);

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3001/api/estudiantes', {
        nombre,
        apellido,
        numero_identificacion: numeroIdentificacion,
      });
      toast.current?.show({ severity: 'success', summary: 'Éxito', detail: 'Estudiante registrado' });
      // Limpiar el formulario después de un registro exitoso
      setNombre('');
      setApellido('');
      setNumeroIdentificacion('');
    } catch (error) {
      console.error('Error al registrar estudiante:', error);
      toast.current?.show({ severity: 'error', summary: 'Error', detail: 'No se pudo registrar el estudiante' });
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <h2>Registro de Estudiantes</h2>
      <div>
        <span className="p-float-label">
          <InputText id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <label htmlFor="nombre">Nombre</label>
        </span>
      </div>
      <div>
        <span className="p-float-label">
          <InputText id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          <label htmlFor="apellido">Apellido</label>
        </span>
      </div>
      <div>
        <span className="p-float-label">
          <InputText id="numeroIdentificacion" value={numeroIdentificacion} onChange={(e) => setNumeroIdentificacion(e.target.value)} />
          <label htmlFor="numeroIdentificacion">Número de Identificación</label>
        </span>
      </div>
      <Button label="Registrar" icon="pi pi-check" onClick={handleSubmit} />
    </div>
  );
};

export default StudentForm;
