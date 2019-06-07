import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { NavParams, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { PratoVegano } from '../model/pratovegano'
import { StorageService } from '../service/storage.service';
import { Pedido } from '../model/pedido';
import { Item } from '../model/item';



@Component({
  selector: 'app-lista-de-pratos-vegano',
  templateUrl: './lista-de-pratos-vegano.page.html',
  styleUrls: ['./lista-de-pratos-vegano.page.scss'],
})
export class ListaDePratosVeganoPage implements OnInit {

  ListaDePratosVegano: PratoVegano[] = [];
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  pedido: Pedido;


  constructor(public router: Router,
    public loadingController: LoadingController,
    public storageServ: StorageService) {

  }

  ngOnInit() {
    this.getList();
  }
  addCarrinho(pratovegano: PratoVegano) {
    this.pedido = this.storageServ.getCart();

    let i = new Item();
    i.pratovegano = pratovegano;
    i.quantidade = 1;

    if (this.pedido == null) {
      this.pedido = new Pedido();
      this.pedido.itens = [];
    }

    this.pedido.itens.push(i);

    this.storageServ.setCart(this.pedido);
  }

  viewPratoVegano() {
    this.router.navigate(['/lista-de-pratos-vegano']);
  }

  viewPratoVegetariano() {
    this.router.navigate(['/lista-de-pratos-vegetariano']);
  }
  PratoView() {
    this.router.navigate(['/lista-de-pratos']);
  }
  Home() {
    this.router.navigate(['/list']);
  }
  ViewPratoVegano(pratovegano: PratoVegano) {
    this.router.navigate(['/view-prato-vegano', { 'pratovegano': pratovegano.id }]);

  }



  getList() {

    var ref = firebase.firestore().collection("pratovegano");
    ref.get().then(query => {
      query.forEach(doc => {

        let c = new PratoVegano();
        c.setDados(doc.data());
        c.id = doc.id;
        let ref = firebase.storage().ref().child(`pratos/${doc.id}.jpg`).getDownloadURL().then(url => {
          c.imagem = url;
          this.ListaDePratosVegano.push(c);
        })

      });
    });
  }


  remove(obj: PratoVegano) {
    var ref = firebase.firestore().collection("pratovegano");
    ref.doc(obj.id).delete()
      .then(() => {
        this.ListaDePratosVegano = [];
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
