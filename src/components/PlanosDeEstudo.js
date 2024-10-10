import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  background: #f9f9f9;
  margin: 10px 0;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PlanosDeEstudo = () => {
  const [planos, setPlanos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [nome, setNome] = useState('');
  const [disciplinas, setDisciplinas] = useState('');
  const [horarios, setHorarios] = useState('');
  const [diasDaSemana, setDiasDaSemana] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchPlanos();
  }, []);

  const fetchPlanos = () => {
    axios.get('http://localhost:5000/api/planos')
      .then(response => setPlanos(response.data))
      .catch(error => console.error('Erro ao buscar planos:', error));
  };

  const handleEdit = (plano) => {
    setEditandoId(plano._id);
    setNome(plano.nome);
    setDisciplinas(plano.disciplinas.join(', '));
    setHorarios(plano.horarios.join(', '));
    setDiasDaSemana(plano.diasDaSemana.join(', '));
  };

  const handleUpdate = (id) => {
    const planoAtualizado = {
      nome,
      disciplinas: disciplinas.split(',').map(d => d.trim()),
      horarios: horarios.split(',').map(h => h.trim()),
      diasDaSemana: diasDaSemana.split(',').map(d => d.trim()),
    };

    axios.put(`http://localhost:5000/api/planos/${id}`, planoAtualizado)
      .then(() => {
        console.log('Plano de estudo atualizado');
        setEditandoId(null);
        fetchPlanos();
        toast.success('Plano atualizado com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao atualizar plano de estudo:', error);
        toast.error('Erro ao atualizar plano de estudo.');
      });
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    axios.delete(`http://localhost:5000/api/planos/${deleteId}`)
      .then(() => {
        console.log('Plano de estudo excluído');
        fetchPlanos();
        setShowModal(false);
        toast.success('Plano excluído com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao excluir plano de estudo:', error);
        toast.error('Erro ao excluir plano de estudo.');
      });
  };

  const handleCancel = () => {
    setEditandoId(null);
  };

  return (
    <Container>
      <Title>Planos de Estudo</Title>
      <List>
        {planos.map(plano => (
          <ListItem key={plano._id}>
            {editandoId === plano._id ? (
              <div>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome do plano" />
                <input type="text" value={disciplinas} onChange={(e) => setDisciplinas(e.target.value)} placeholder="Disciplinas" />
                <input type="text" value={horarios} onChange={(e) => setHorarios(e.target.value)} placeholder="Horários" />
                <input type="text" value={diasDaSemana} onChange={(e) => setDiasDaSemana(e.target.value)} placeholder="Dias da Semana" />
                <Button variant="success" onClick={() => handleUpdate(plano._id)}>Salvar</Button>
                <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
              </div>
            ) : (
              <div>
                <h2>{plano.nome}</h2>
                <p>Disciplinas: {plano.disciplinas.join(', ')}</p>
                <p>Horários: {plano.horarios.join(', ')}</p>
                <p>Dias da Semana: {plano.diasDaSemana.join(', ')}</p>
                <Button variant="warning" onClick={() => handleEdit(plano)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(plano._id)}>Excluir</Button>
              </div>
            )}
          </ListItem>
        ))}
      </List>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza de que deseja excluir este plano de estudo?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </Container>
  );
};

export default PlanosDeEstudo;
