export class Prato{

    id : string;
    nome : string;
    descricao : string;
    valor : string;

    constructor(){   
    }

    // Dados do firebase
    setDados(obj : any){
        this.nome = obj.nome;
        this.descricao = obj.descricao;
        this.valor = obj.valor;
    }
}