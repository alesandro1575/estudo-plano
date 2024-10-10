// Importações
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PlanoDeEstudo = require('./models/PlanoDeEstudo');

// Configuração do Servidor
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Conectar ao MongoDB Atlas
const mongoURI = 'mongodb+srv://jralesandroalmeida:87612601@cluster0.lvjje.mongodb.net/Cluster0?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Atlas conectado'))
  .catch(err => console.error('Erro ao conectar ao MongoDB Atlas', err));

// Definição de Rotas

// Criar um novo plano de estudo
app.post('/api/planos', async (req, res) => {
  try {
    const novoPlano = new PlanoDeEstudo(req.body);
    await novoPlano.save();
    res.status(201).send(novoPlano);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obter todos os planos de estudo
app.get('/api/planos', async (req, res) => {
  try {
    const planos = await PlanoDeEstudo.find();
    res.send(planos);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Atualizar um plano de estudo
app.put('/api/planos/:id', async (req, res) => {
  try {
    const planoAtualizado = await PlanoDeEstudo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!planoAtualizado) {
      return res.status(404).send();
    }
    res.send(planoAtualizado);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Deletar um plano de estudo
app.delete('/api/planos/:id', async (req, res) => {
  try {
    const planoDeletado = await PlanoDeEstudo.findByIdAndDelete(req.params.id);
    if (!planoDeletado) {
      return res.status(404).send();
    }
    res.send(planoDeletado);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Iniciar o Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
