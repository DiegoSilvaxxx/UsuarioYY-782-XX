import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Cliente } from '../model/cliente';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {

  firestore = firebase.firestore();

  usuario: Usuario = new Usuario();
  
  id : string;

  
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(public navctrl : NavController, 
              public router : Router,
              private firebaseauth : AngularFireAuth  ) {

                this.firebaseauth.authState.subscribe(obj=>{
                  this.id = this.firebaseauth.auth.currentUser.uid;
                  
                  
            
                });

    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  ngOnInit() {
    this.obterCliente();
  }

  obterCliente() {
    var ref = firebase.firestore().collection("usuario").doc(this.id);
    ref.get().then(doc => {
    this.usuario.setDados(doc.data());
    
    console.log(this.usuario);  

    }).catch((error) => {
      console.log("Error getting document:", error);
    

    });
  }

  HomeAdm(){
    this.router.navigate(['/lista-de-pratos']);
  }

  HomeCm(){
    this.router.navigate(['/lista-de-pratos-cm']);
  }

  cadastrar(){
    
    this.router.navigate(['/lista-de-clientes', { id: '12' }]);
   
     
   }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
