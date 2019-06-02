import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { NavParams, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PratoVegetariano } from '../model/pratovegetariano';

@Component({
  selector: 'app-lista-de-pratos-vegetariano',
  templateUrl: './lista-de-pratos-vegetariano.page.html',
  styleUrls: ['./lista-de-pratos-vegetariano.page.scss'],
})
export class ListaDePratosVegetarianoPage implements OnInit {

  ListaDePratosVegetariano: PratoVegetariano[] = [];
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
