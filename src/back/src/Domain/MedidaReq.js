
class MedidaReq{
    constructor(data){
        this.nome =  data.nome;
        this.tarefa = data.tarefa;
        this.desempenho = data.desempenho;
        this.estimativa = data.estimativa;
    }
}


module.exports =  MedidaReq;