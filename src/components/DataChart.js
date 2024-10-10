// DataChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
  datasets: [
    {
      label: 'Horas de Estudo',
      data: [12, 19, 3, 5, 2],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const DataChart = () => (
  <div>
    <Bar data={data} />
  </div>
);

export default DataChart;
