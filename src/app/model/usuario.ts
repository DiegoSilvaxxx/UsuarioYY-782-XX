export class Usuario{
    tipo : string;

    constructor(){   
    }

    // Dados do firebase
    setDados(obj : any){
      
        this.tipo = obj.tipo;
       
    }
}