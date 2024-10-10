import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faCalendarAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';

const StyledNavbar = styled(Navbar)`
  background-color: #1a1a2e; /* Cor de fundo mais escura */
`;

const StyledNavLink = styled(Nav.Link)`
  margin-right: 15px;
  display: flex;
  align-items: center;
  color: #eaeaea; /* Cor do texto mais clara */
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: #00aaff; /* Cor de destaque ao passar o mouse */
    transform: translateY(-2px);
  }
`;

const StyledButton = styled(Button)`
  margin-left: 10px;
  color: #eaeaea;
  border-color: #00aaff;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #00aaff;
    transform: translateY(-2px);
  }
`;

const AppNavbar = () => {
  return (
    <StyledNavbar expand="lg" sticky="top" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">EstudoApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <StyledNavLink as={Link} to="/">
              <FontAwesomeIcon icon={faHome} style={{ marginRight: '5px' }} />
              Dashboard
            </StyledNavLink>
            <StyledNavLink as={Link} to="/planos">
              <FontAwesomeIcon icon={faBook} style={{ marginRight: '5px' }} />
              Planos de Estudo
            </StyledNavLink>
            <StyledNavLink as={Link} to="/calendario">
              <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '5px' }} />
              Calendário
            </StyledNavLink>
            <StyledNavLink as={Link} to="/novo-plano">
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px' }} />
              Novo Plano
            </StyledNavLink>
          </Nav>
          <StyledButton as={Link} to="/integracao-google" variant="outline-light">
            <FontAwesomeIcon icon={faGoogle} style={{ marginRight: '5px' }} />
            Google Calendar
          </StyledButton>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

export default AppNavbar;
