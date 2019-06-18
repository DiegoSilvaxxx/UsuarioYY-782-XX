import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { NavParams, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PratoVegetariano } from '../model/pratovegetariano';


import { StorageService } from '../service/storage.service';
import { Pedido } from '../model/pedido';
import { Item } from '../model/item';


@Component({
  selector: 'app-lista-de-pratos-vegetariano',
  templateUrl: './lista-de-pratos-vegetariano.page.html',
  styleUrls: ['./lista-de-pratos-vegetariano.page.scss'],
})
export class ListaDePratosVegetarianoPage implements OnInit {

  ListaDePratosVegetariano: PratoVegetariano[] = [];
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
    console.log(this.ListaDePratosVegetariano);
  }

  addCarrinho(pratovegetariano: PratoVegetariano) {



    this.pedido = this.storageServ.getCart();
    let add = true;

    let i = new Item();
    i.pratovegetariano = pratovegetariano;
    i.quantidade = 1;

    if (this.pedido == null) {
      this.pedido = new Pedido();
      this.pedido.itens = [];
    } else {


      this.pedido.itens.forEach(p => {
        console.log(p)

        if (p.pratovegetariano !== undefined) {
          if (p.pratovegetariano.id == pratovegetariano.id) {
            add = false;
          }
        }



      });

    }

    if (add == true) this.pedido.itens.push(i);

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
  Carrinho() {
    this.router.navigate(['/carrinho']);
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

        let ref = firebase.storage().ref().child(`pratos/${doc.id}.jpg`).getDownloadURL().then(url => {
          c.imagem = url;

          this.ListaDePratosVegetariano.push(c);
        })
        // .catch(err=>{
        //  this.ListaDePratosVegetariano.push(c);
        //  })

      });
    });
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