import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { NavParams, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PratoVegano } from '../model/pratovegano'


@Component({
  selector: 'app-lista-de-pratos-vegano',
  templateUrl: './lista-de-pratos-vegano.page.html',
  styleUrls: ['./lista-de-pratos-vegano.page.scss'],
})
export class ListaDePratosVeganoPage implements OnInit {

  ListaDePratosVegano: PratoVegano[] = [];
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };


  constructor(public router: Router, public loadingController: LoadingController) {

  }

  ngOnInit() {
    this.getList();
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
  ViewPratoVegano() {
    this.router.navigate(['/view-prato-vegano']);

  }



  getList() {

    var ref = firebase.firestore().collection("pratovegano");
    ref.get().then(query => {
      query.forEach(doc => {

        let c = new PratoVegano();
        c.setDados(doc.data());
        c.id = doc.id;
        // let ref = firebase.storage().ref().child(`pratos/${doc.id}.jpg`).getDownloadURL().then(url => {
        // c.imagem = url;
        this.ListaDePratosVegano.push(c);
      })

    });
    // });
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
