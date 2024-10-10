import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const disciplinesOptions = [
  "Algoritmos",
  "Estruturas de Dados",
  "Programação Orientada a Objetos",
  "Banco de Dados",
  "Sistemas Operacionais",
  "Redes de Computadores",
  "Engenharia de Software",
  "Inteligência Artificial",
  "Computação Gráfica",
  "Matemática Discreta"
];

const daysOfWeekOptions = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado"
];

const AnimatedButton = styled.button`
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
`;

const NovoPlanoDeEstudo = () => {
  const formik = useFormik({
    initialValues: {
      nome: '',
      disciplinas: [],
      horarios: '',
      diasDaSemana: [],
    },
    validationSchema: Yup.object({
      nome: Yup.string().required('Nome é obrigatório'),
      disciplinas: Yup.array().min(1, 'Selecione pelo menos uma disciplina'),
      horarios: Yup.string().required('Horários são obrigatórios'),
      diasDaSemana: Yup.array().min(1, 'Selecione pelo menos um dia da semana'),
    }),
    onSubmit: (values, { resetForm }) => {
      const novoPlano = {
        nome: values.nome,
        disciplinas: values.disciplinas,
        horarios: values.horarios.split(',').map(h => h.trim()),
        diasDaSemana: values.diasDaSemana,
      };

      axios.post('http://localhost:5000/api/planos', novoPlano)
        .then(response => {
          console.log('Plano de estudo adicionado:', response.data);
          toast.success('Plano adicionado com sucesso!');
          resetForm();
        })
        .catch(error => {
          console.error('Erro ao adicionar plano de estudo:', error);
          toast.error('Erro ao adicionar plano de estudo.');
        });
    },
  });

  return (
    <div className="container mt-4">
      <h2>Adicionar Novo Plano de Estudo</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome:</label>
          <input
            type="text"
            id="nome"
            className={`form-control ${formik.touched.nome && formik.errors.nome ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('nome')}
            placeholder="Ex: Estudo Matemática"
          />
          {formik.touched.nome && formik.errors.nome ? (
            <div className="invalid-feedback">{formik.errors.nome}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="disciplinas" className="form-label">Disciplinas:</label>
          <select
            multiple
            id="disciplinas"
            className={`form-control ${formik.touched.disciplinas && formik.errors.disciplinas ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('disciplinas')}
          >
            {disciplinesOptions.map((disciplina, index) => (
              <option key={index} value={disciplina}>{disciplina}</option>
            ))}
          </select>
          {formik.touched.disciplinas && formik.errors.disciplinas ? (
            <div className="invalid-feedback">{formik.errors.disciplinas}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="horarios" className="form-label">Horários:</label>
          <input
            type="text"
            id="horarios"
            className={`form-control ${formik.touched.horarios && formik.errors.horarios ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('horarios')}
            placeholder="Ex: 08:00-09:00, 14:00-15:00"
          />
          {formik.touched.horarios && formik.errors.horarios ? (
            <div className="invalid-feedback">{formik.errors.horarios}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="diasDaSemana" className="form-label">Dias da Semana:</label>
          <select
            multiple
            id="diasDaSemana"
            className={`form-control ${formik.touched.diasDaSemana && formik.errors.diasDaSemana ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('diasDaSemana')}
          >
            {daysOfWeekOptions.map((day, index) => (
              <option key={index} value={day}>{day}</option>
            ))}
          </select>
          {formik.touched.diasDaSemana && formik.errors.diasDaSemana ? (
            <div className="invalid-feedback">{formik.errors.diasDaSemana}</div>
          ) : null}
        </div>
        <AnimatedButton type="submit" className="btn btn-primary">Adicionar Plano</AnimatedButton>
      </form>
      <ToastContainer />
    </div>
  );
};

export default NovoPlanoDeEstudo;
