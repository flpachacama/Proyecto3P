import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

const ReportTable: React.FC = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/reportes');
      setReportData(response.data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  return (
    <div>
      <h2>Reporte Final de Calificaciones</h2>
      <DataTable value={reportData}>
        <Column field="nombre" header="Estudiante"></Column>
        <Column field="apellido" header="Apellido"></Column>
        <Column field="nombre_materia" header="Materia"></Column>
        <Column field="calificacion" header="Calificación"></Column>
        <Column field="promedio" header="Promedio"></Column>
      </DataTable>
    </div>
  );
};

export default ReportTable;
