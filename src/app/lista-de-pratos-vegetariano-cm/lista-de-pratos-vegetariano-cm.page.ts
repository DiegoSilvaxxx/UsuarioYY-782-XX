import { Component, OnInit } from '@angular/core';



import * as firebase from 'firebase';
import { NavParams, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { PratoVegetariano } from '../model/pratovegetariano'
import { StorageService } from '../service/storage.service';
import { Pedido } from '../model/pedido';
import { Item } from '../model/item';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-lista-de-pratos-vegetariano-cm',
  templateUrl: './lista-de-pratos-vegetariano-cm.page.html',
  styleUrls: ['./lista-de-pratos-vegetariano-cm.page.scss'],
})
export class ListaDePratosVegetarianoCmPage implements OnInit {

 
  ListaDePratosVegetarianoCm: PratoVegetariano[] = [];
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  @ViewChild("textoBusca") textoBusca;

  slideOpts = {
    initialSlide: 2,
    speed: 400,
    loop: 'auto',
    autoplay: true
  };

  pedido: Pedido;


  constructor(public router: Router,
    public loadingController: LoadingController,
    public storageServ: StorageService) {

    this.pedido = this.storageServ.getCart();

  }

  ngOnInit() {
    this.getList();
    console.log(this.ListaDePratosVegetarianoCm);
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

  busca() {
    this.ListaDePratosVegetarianoCm = [];
    var ref = firebase.firestore().collection("pratovegetariano");
    //ref.orderBy('nome').startAfter(this.textoBusca.value).get().then(doc=> {
    ref.orderBy('nome').startAfter(this.textoBusca.value).endAt(this.textoBusca.value + '\uf8ff').get().then(doc => {

      if (doc.size > 0) {

        doc.forEach(doc => {

          let p = new PratoVegetariano();
          p.setDados(doc.data());
          p.id = doc.id;
          this.ListaDePratosVegetarianoCm.push(p);

        });

        this.busca2();

      } else {
        this.ListaDePratosVegetarianoCm = [];
        // doc.data() will be undefined in this case
        console.log("No such document!");
        this.busca2();
        this.busca3();
      }
    })

    //this.router.navigate(['/Prato', { 'filtro': "busca" }]);
  }

  busca2() {



    var ref = firebase.firestore().collection("pratovegetariano");
    //ref.orderBy('nome').startAfter(this.textoBusca.value).get().then(doc=> {
    ref.orderBy('nome').startAfter(this.textoBusca.value).endAt(this.textoBusca.value + '\uf8ff').get().then(doc => {

      if (doc.size > 0) {

        doc.forEach(doc => {

          let p = new PratoVegetariano();
          p.setDados(doc.data());
          p.id = doc.id;
          this.ListaDePratosVegetarianoCm.push(p);

        });

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })

    //this.router.navigate(['/Prato', { 'filtro': "busca" }]);
  }

  busca3() {



    var ref = firebase.firestore().collection("pratovegetariano");
    //ref.orderBy('nome').startAfter(this.textoBusca.value).get().then(doc=> {
    ref.orderBy('nome').startAfter(this.textoBusca.value).endAt(this.textoBusca.value + '\uf8ff').get().then(doc => {

      if (doc.size > 0) {

        doc.forEach(doc => {

          let p = new PratoVegetariano();
          p.setDados(doc.data());
          p.id = doc.id;
          this.ListaDePratosVegetarianoCm.push(p);

        });

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })

    //this.router.navigate(['/Prato', { 'filtro': "busca" }]);
  }

  viewPratoVegano() {
    this.router.navigate(['/lista-de-pratos-vegano-cm']);
  }

  viewPratoVegetariano() {
    this.router.navigate(['/lista-de-pratos-vegetariano']);
  }
  Home() {
    this.router.navigate(['/list']);
  }
  ViewPratoVegetariano(pratovegetariano: PratoVegetariano) {
    this.router.navigate(['/view-prato-vegetariano', { 'pratovegetariano': pratovegetariano.id }]);

  }
  Carrinho() {
    this.router.navigate(['/carrinho']);
  }

  ListaDePromocoesCm() {
    this.router.navigate(['/lista-de-promocoes-cm']);
  }

  ListaDeParceriasCm() {
    this.router.navigate(['/lista-de-parcerias-cm']);
  }
  ListaDePratos(){
    this.router.navigate(['/lista-de-pratos-cm']);
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

          this.ListaDePratosVegetarianoCm.push(c);
        })
          .catch(err => {
            this.ListaDePratosVegetarianoCm.push(c);
          })

      });
    });
  }


  remove(obj: PratoVegetariano) {
    var ref = firebase.firestore().collection("pratovegetariano");
    ref.doc(obj.id).delete()
      .then(() => {
        this.ListaDePratosVegetarianoCm = [];
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

