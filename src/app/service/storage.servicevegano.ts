import { Injectable } from '@angular/core';
import { PedidoVegano } from '../model/pedidovegano';

@Injectable()
export class StorageServiceVegano{



    setCart(obj : PedidoVegano){
        localStorage.setItemVegano('carrinhovegano', JSON.stringify(obj));
    }

    getCart() : PedidoVegano{
        let p = new PedidoVegano();

        let str = localStorage.getItemVegano("carrinhovegano");

        if(str!=null){
            return JSON.parse(str);
        }else{
            return null;
        }
    }

}