import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faClock } from '@fortawesome/free-solid-svg-icons';

const CalendarContainer = styled.div`
  padding: 20px;
  background-color: #f0f4f8;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 20px auto;
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
`;

const DayContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const DayColumn = styled.div`
  flex: 1;
  padding: 15px;
  background-color: #e3e8ee;
  border-radius: 8px;
  text-align: center;
  font-size: 1.2em;
  min-height: 150px;
`;

const EventItem = styled.li`
  list-style: none;
  margin: 15px 0;
  text-align: left;
  background-color: #d1ecf1;
  border-radius: 6px;
  padding: 10px;
  color: #0c5460;
  font-weight: bold;
`;

const Calendario = ({ planos = [] }) => {
  const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  return (
    <CalendarContainer>
      <Title>Seu Calendário de Estudos</Title>
      <DayContainer>
        {daysOfWeek.map((day, index) => (
          <DayColumn key={index}>
            <h4>{day}</h4>
            <ul>
              {planos
                .filter(plano => plano.diasDaSemana.includes(day))
                .map((plano, idx) => (
                  plano.disciplinas.map((disciplina, dIdx) => (
                    <EventItem key={`${idx}-${dIdx}`}>
                      <FontAwesomeIcon icon={faBook} style={{ marginRight: '5px' }} />
                      {disciplina}
                      <br />
                      <FontAwesomeIcon icon={faClock} style={{ marginRight: '5px' }} />
                      {plano.horarios.join(', ')}
                    </EventItem>
                  ))
                ))}
            </ul>
          </DayColumn>
        ))}
      </DayContainer>
    </CalendarContainer>
  );
};

export default Calendario;
