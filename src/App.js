import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { GlobalStyles } from './styles/global';
import AppNavbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import PlanosDeEstudo from './components/PlanosDeEstudo';
import Calendario from './components/Calendario';
import NovoPlanoDeEstudo from './components/NovoPlanoDeEstudo';
import GoogleCalendarIntegration from './components/GoogleCalendarIntegration';
import LoadingSpinner from './components/LoadingSpinner'; // Supondo que você tenha um componente de carregamento

const App = () => {
  const [theme, setTheme] = useState('light');
  const [planos, setPlanos] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    // Fetch the planos from your API or source
    fetch('http://localhost:5000/api/planos')
      .then(response => response.json())
      .then(data => {
        setPlanos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar planos:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Router>
        <AppNavbar toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/planos" element={<PlanosDeEstudo />} />
          <Route path="/calendario" element={<Calendario planos={planos} />} />
          <Route path="/novo-plano" element={<NovoPlanoDeEstudo />} />
          <Route path="/integracao-google" element={<GoogleCalendarIntegration />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
