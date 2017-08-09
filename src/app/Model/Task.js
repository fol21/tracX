import uuid from 'uuid/v4';

export default class Task {
	constructor(titulo, tarefaRedmine, estimativa) {
		this.titulo = titulo;
		this.tarefaRedmine = tarefaRedmine;
		this.estimativa = estimativa;
		this.desempenho = {inicio: new Date};
		this.key = uuid();
		this.rodando = true
	}
}
