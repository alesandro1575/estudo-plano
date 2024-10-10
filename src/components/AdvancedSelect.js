// AdvancedSelect.js
import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'algoritmos', label: 'Algoritmos' },
  { value: 'estruturas', label: 'Estruturas de Dados' },
  // ... outras opções
];

const AdvancedSelect = () => (
  <Select options={options} isMulti />
);

export default AdvancedSelect;
