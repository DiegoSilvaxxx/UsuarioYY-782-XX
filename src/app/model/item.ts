import { Prato } from './prato';
import { PratoVegano } from './pratovegano';
import { PratoVegetariano } from './pratovegetariano'
import { Promocao } from './promocao'

export class Item {
    prato: Prato;
    pratovegano: PratoVegano;
    pratovegetariano: PratoVegetariano;
    promocao: Promocao;
    quantidade: number;

}



