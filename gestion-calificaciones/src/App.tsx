import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Componentes/Navbar'; 
import StudentForm from './Componentes/StudentForm';
import SubjectEnrollment from './Componentes/SubjectEnrollment';
import GradeRegistration from './Componentes/GradeRegistration';
import ReportTable from './Componentes/ReportTable';
import './App.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import 'primereact/resources/primereact.min.css';                
import 'primeicons/primeicons.css';        

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<h1>Proyecto Tercer Parcial <br></br><br></br>
              Freddy Leonel Pachacama <br></br><br></br>
              Programación Integrativa de Componentes
            </h1>} />
            
            <Route path="/registro-estudiantes" element={<StudentForm />} />
            <Route path="/matriculacion-materias" element={<SubjectEnrollment />} />
            <Route path="/registro-calificaciones" element={<GradeRegistration />} />
            <Route path="/reporte-calificaciones" element={<ReportTable />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
