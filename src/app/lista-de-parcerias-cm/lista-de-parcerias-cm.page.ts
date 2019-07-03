import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { NavParams, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Parceria } from '../model/parceria'
import { StorageService } from '../service/storage.service';
import { Pedido } from '../model/pedido';
import { Item } from '../model/item';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-lista-de-parcerias-cm',
  templateUrl: './lista-de-parcerias-cm.page.html',
  styleUrls: ['./lista-de-parcerias-cm.page.scss'],
})
export class ListaDeParceriasCmPage implements OnInit {

  ListaDeParceriasCm: Parceria[] = [];
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };



  constructor(public router: Router,
    public loadingController: LoadingController,
    public storageServ: StorageService) {

 

  }

  ngOnInit() {
    this.getList();
    console.log(this. ListaDeParceriasCm);
  }

 

  ListaDePratos() {
    this.router.navigate(['/lista-de-pratos-cm']);
  }

  ViewParceria(parceria: Parceria) {
    this.router.navigate(['/view-parceria', { 'parceria': parceria.id }]);

  }




  getList() {

    var ref = firebase.firestore().collection("parceria");
    ref.get().then(query => {
      query.forEach(doc => {

        let c = new Parceria();
        c.setDados(doc.data());
        c.id = doc.id;

        let ref = firebase.storage().ref().child(`parca/${doc.id}.jpg`).getDownloadURL().then(url => {
          c.imagem = url;

          this.ListaDeParceriasCm.push(c);
        })

          .catch(err => {
            this.ListaDeParceriasCm.push(c);
          })

      });
    });
  }


  remove(obj: Parceria) {
    var ref = firebase.firestore().collection("parceria");
    ref.doc(obj.id).delete()
      .then(() => {
        this.ListaDeParceriasCm = [];
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
