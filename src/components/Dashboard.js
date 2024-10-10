import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  color: #343a40;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Title>Bem-vindo ao seu Painel de Controle</Title>
      <p>Aqui você pode gerenciar seus planos de estudo e calendário.</p>
    </DashboardContainer>
  );
};

export default Dashboard;
