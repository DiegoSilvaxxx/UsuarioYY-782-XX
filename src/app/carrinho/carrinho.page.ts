import { Component, OnInit } from '@angular/core';
import { Prato } from '../model/prato';
import { StorageService } from '../service/storage.service';
import { Pedido } from '../model/pedido';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  pedido: Pedido = new Pedido();
  constructor(public storageServ: StorageService,
              public router: Router) {

    this.pedido = storageServ.getCart();
    console.log(this.pedido);
  }

  ngOnInit() {
  }
  removeCar(prato : Prato) {
    this.storageServ.setRemoveCart(prato);
    this.pedido = this.storageServ.getCart();

  }


  Home() {
    this.router.navigate(['/list']);
  }

}
