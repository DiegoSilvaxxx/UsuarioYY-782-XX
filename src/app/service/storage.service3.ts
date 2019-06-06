import { Injectable } from '@angular/core';
import { PedidoVegetariano } from '../model/pedidovegetariano';

@Injectable()
export class StorageService3 {



    setCart(obj: PedidoVegetariano) {
        localStorage.setItemVegano('carrinho', JSON.stringify(obj));
    }

    getCart(): PedidoVegetariano {
        let p = new PedidoVegetariano();

        let str = localStorage.getItemVegano("carrinho");

        if (str != null) {
            return JSON.parse(str);
        } else {
            return null;
        }
    }

}