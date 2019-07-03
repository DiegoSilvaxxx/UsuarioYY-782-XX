import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { NavParams, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Promocao } from '../model/promocao'
import { StorageService } from '../service/storage.service';
import { Pedido } from '../model/pedido';
import { Item } from '../model/item';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-lista-de-promocoes-cm',
  templateUrl: './lista-de-promocoes-cm.page.html',
  styleUrls: ['./lista-de-promocoes-cm.page.scss'],
})
export class ListaDePromocoesCmPage implements OnInit {

  ListaDePromocoesCm: Promocao[] = [];
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
    console.log(this. ListaDePromocoesCm);
  }

  addCarrinho(promocao: Promocao) {



    this.pedido = this.storageServ.getCart();
    let add = true;

    let i = new Item();
    i.promocao = promocao;
    i.quantidade = 1;

    if (this.pedido == null) {

      this.pedido = new Pedido();
      this.pedido.itens = [];

    } else {


      this.pedido.itens.forEach(p => {


        if (p.promocao !== undefined) {


          if (p.promocao.id == promocao.id) {
            add = false;
          }
        }


      });

    }

    if (add == true) this.pedido.itens.push(i);

    this.storageServ.setCart(this.pedido);




  }

  ListaDePratos() {
    this.router.navigate(['/lista-de-pratos-cm']);
  }

  ViewPromocao(promocao: Promocao) {
    this.router.navigate(['/view-promocao', { 'promocao': promocao.id }]);

  }
  Carrinho(){
    this.router.navigate(['/carrinho']);

  }



  getList() {

    var ref = firebase.firestore().collection("promocao");
    ref.get().then(query => {
      query.forEach(doc => {

        let c = new Promocao();
        c.setDados(doc.data());
        c.id = doc.id;

        let ref = firebase.storage().ref().child(`promo/${doc.id}.jpg`).getDownloadURL().then(url => {
          c.imagem = url;

          this. ListaDePromocoesCm.push(c);
        })

          .catch(err => {
            this. ListaDePromocoesCm.push(c);
          })

      });
    });
  }


  remove(obj: Promocao) {
    var ref = firebase.firestore().collection("promocao");
    ref.doc(obj.id).delete()
      .then(() => {
        this. ListaDePromocoesCm = [];
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