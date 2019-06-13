import { Injectable } from '@angular/core';
import { Pedido } from '../model/pedido';
import { Prato } from '../model/prato';
import { PratoVegano } from '../model/pratovegano';
import { PratoVegetariano } from '../model/pratovegetariano';



@Injectable()
export class StorageService {



    setCart(obj: Pedido) {
        localStorage.setItem('carrinho', JSON.stringify(obj));
    }

    getCart(): Pedido {
        let p = new Pedido();

        let str = localStorage.getItem("carrinho");

        if (str != null) {
            return JSON.parse(str);
        } else {
            return null;
        }
    }

    setRemoveCart(prato : Prato){
        let lista : Pedido = this.getCart();
        
       let pos = lista.itens.findIndex(
           x=>x.prato.id == prato.id);
           
       if(pos!= -1){ // -1 -> Não existe
        lista.itens.splice(pos,1);
        }
        
        localStorage.setItem('carrinho', JSON.stringify(lista));
    }
    setRemoveCartVeg(pratovegano: PratoVegano) {
        let lista: Pedido = this.getCart();

        let pos = lista.itens.findIndex(
            x => x.pratovegano.id == pratovegano.id);

        if (pos != -1) { // -1 -> Não existe
            lista.itens.splice(pos, 1);
        }

        localStorage.setItem('carrinho', JSON.stringify(lista));
    }

    setRemoveCartVeget(pratovegetariano: PratoVegetariano) {
        let lista: Pedido = this.getCart();

        let pos = lista.itens.findIndex(
            x => x.pratovegetariano.id == pratovegetariano.id);

        if (pos != -1) { // -1 -> Não existe
            lista.itens.splice(pos, 1);
        }

        localStorage.setItem('carrinho', JSON.stringify(lista));
    }
  

}