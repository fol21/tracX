const mongoose = require('mongoose');

var medidaSchema = mongoose.Schema({
  nome: String,
  tarefa: Number,
  desempenho:{
      inicio: String,
      fim: String
  },
    id: String,
    estimativa: Number
});

module.exports = mongoose.model('Medida', medidaSchema);
