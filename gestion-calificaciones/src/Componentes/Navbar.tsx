import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      command: () => {
        navigate('/');
      },
    },
    {
      label: 'Registro de Estudiantes',
      icon: 'pi pi-users',
      command: () => {
        navigate('/registro-estudiantes');
      },
    },
    {
      label: 'Matriculación de Materias',
      icon: 'pi pi-book',
      command: () => {
        navigate('/matriculacion-materias');
      },
    },
    {
      label: 'Registro de Calificaciones',
      icon: 'pi pi-pencil',
      command: () => {
        navigate('/registro-calificaciones');
      },
    },
    {
      label: 'Reporte de Calificaciones',
      icon: 'pi pi-chart-bar',
      command: () => {
        navigate('/reporte-calificaciones');
      },
    },
  ];

  return (
    <div>
      <Menubar model={items} />
    </div>
  );
};

export default Navbar;
