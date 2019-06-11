import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { NavParams, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Prato } from '../model/prato';

import { Pedido } from '../model/pedido';
import { StorageService } from '../service/storage.service';
import { Item } from '../model/item';

@Component({
  selector: 'app-lista-de-pratos',
  templateUrl: './lista-de-pratos.page.html',
  styleUrls: ['./lista-de-pratos.page.scss'],
})
export class ListaDePratosPage implements OnInit {

  ListaDePratos: Prato[] = [];
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  pedido: Pedido;


  constructor(public router: Router,
    public loadingController: LoadingController,
    public storageServ: StorageService) {

    this.pedido = this.storageServ.getCart();
  }



  ngOnInit() {
    this.getList();
  }
  addCarrinho(prato: Prato) {
    this.pedido = this.storageServ.getCart();
    let add = true;

    let i = new Item();
    i.prato = prato;
    i.quantidade = 1;

    if (this.pedido == null) {
      this.pedido = new Pedido();
      this.pedido.itens = [];
    }
    this.pedido.itens.forEach(p => {
      if (p.prato.id = prato.id) {
        add = false;
      }
    });
    if (add == true) this.pedido.itens.push(i);

    this.storageServ.setCart(this.pedido);
  }

  viewPratoVegano() {
    this.router.navigate(['/lista-de-pratos-vegano']);
  }

  viewPratoVegetariano() {
    this.router.navigate(['/lista-de-pratos-vegetariano']);
  }
  Home() {
    this.router.navigate(['/list']);
  }
  viewPrato(prato: Prato) {
    this.router.navigate(['/prato-view', { 'prato': prato.id }]);

  }
  Carrinho() {
    this.router.navigate(['/carrinho']);
  }


  getList() {

    var ref = firebase.firestore().collection("prato");
    ref.get().then(query => {
      query.forEach(doc => {

        let c = new Prato();
        c.setDados(doc.data());
        c.id = doc.id;
        let ref = firebase.storage().ref().child(`pratos/${doc.id}.jpg`).getDownloadURL().then(url => {
          c.imagem = url;
          this.ListaDePratos.push(c);
        })

      });
    });
  }


  remove(obj: Prato) {
    var ref = firebase.firestore().collection("prato");
    ref.doc(obj.id).delete()
      .then(() => {
        this.ListaDePratos = [];
        this.getList();
      }).catch(() => {
        console.log('Erro ao atualizar');
      })
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Hellooo',
      duration: 2000
    });
    await loading.present();


  }




}
