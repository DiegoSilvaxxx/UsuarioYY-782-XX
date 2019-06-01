import { Component, OnInit } from '@angular/core';


import * as firebase from 'firebase';
import { NavParams, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Prato } from '../model/prato';

@Component({
  selector: 'app-lista-de-pratos',
  templateUrl: './lista-de-pratos.page.html',
  styleUrls: ['./lista-de-pratos.page.scss'],
})
export class ListaDePratosPage implements OnInit {

  ListaDePratos : Prato[] = [];
  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};
  

  constructor(public router : Router, public loadingController: LoadingController) {
    
  }

  ngOnInit() {
    this.getList();
  }

  viewPratoVegano(){
    this.router.navigate(['/lista-de-pratos-vegano']);
  }

  viewPratoVegetariano(){
    this.router.navigate(['/lista-de-pratos-vegetariano']);
  }
  

  getList() {

    var ref = firebase.firestore().collection("prato");
    ref.get().then(query => {
        query.forEach(doc => {

            let c = new Prato();
            c.setDados(doc.data());
            c.id = doc.id;
            let ref = firebase.storage().ref().child(`pratos/${doc.id}.jpg`).getDownloadURL().then( url=>{ 
              c.imagem = url;
              this.ListaDePratos.push(c);
            })

        });
    });
  }


  remove(obj : Prato){
    var ref = firebase.firestore().collection("prato");
    ref.doc(obj.id).delete()
      .then(()=>{
        this.ListaDePratos = [];
        this.getList();
      }).catch(()=>{
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
