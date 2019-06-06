import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { NavParams, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PratoVegetariano } from '../model/pratovegetariano';
import { PedidoVegetariano } from '../model/pedidovegetariano';
import { StorageService3 } from '../service/storage.service3';
import { ItemVegetariano } from '../model/itemvegetariano';

@Component({
  selector: 'app-lista-de-pratos-vegetariano',
  templateUrl: './lista-de-pratos-vegetariano.page.html',
  styleUrls: ['./lista-de-pratos-vegetariano.page.scss'],
})
export class ListaDePratosVegetarianoPage implements OnInit {

  ListaDePratosVegetariano: PratoVegetariano[] = [];
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  pedidovegetariano: PedidoVegetariano;



  constructor(public router: Router,
    public loadingController: LoadingController,
    public storageServ: StorageService3) {

  }

  ngOnInit() {
    this.getList();
  }
  addCarrinho(pratovegetariano: PratoVegetariano) {
    this.pedidovegetariano = this.storageServ.getCart();

    let iv = new ItemVegetariano();
    iv.pratovegetariano = pratovegetariano;
    iv.quantidade = 1;

    if (this.pedidovegetariano == null) {
      this.pedidovegetariano = new PedidoVegetariano();
      this.pedidovegetariano.itens = [];
    }

    this.pedidovegetariano.itens.push(iv);

    this.storageServ.setCart(this.pedidovegetariano);
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

  ViewPratoVegetariano(pratovegetariano: PratoVegetariano) {
    this.router.navigate(['/view-prato-vegetariano', { 'pratovegetariano': pratovegetariano.id }]);
  }


  getList() {

    var ref = firebase.firestore().collection("pratovegetariano");
    ref.get().then(query => {
      query.forEach(doc => {

        let c = new PratoVegetariano();
        c.setDados(doc.data());
        c.id = doc.id;
        // let ref = firebase.storage().ref().child(`pratos/${doc.id}.jpg`).getDownloadURL().then(url => {
        //   c.imagem = url;
        this.ListaDePratosVegetariano.push(c);
      })

    });
    //  });
  }


  remove(obj: PratoVegetariano) {
    var ref = firebase.firestore().collection("pratovegetariano");
    ref.doc(obj.id).delete()
      .then(() => {
        this.ListaDePratosVegetariano = [];
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
