const mongoose = require('mongoose');

const PlanoDeEstudoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  disciplinas: [String],
  horarios: [String],
  diasDaSemana: [String],
});

module.exports = mongoose.model('PlanoDeEstudo', PlanoDeEstudoSchema);
