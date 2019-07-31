import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  idUsuario: string;
  usuarioEmail: string;

  picture: string = "../../assets/imagens/1.gif";

  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true }


  public appPages = [
    {
      title: 'home',
      url: '/list',
      icon: 'home'
    },
    {
      title: 'Logoff',
      url: '/logoff',
      icon: 'md-exit'
    },

    {
      title: 'Cardápio',
      url: '/lista-de-pratos',
      icon: 'nutrition'
    },

    {
      title: 'Cardápio Vegano',
      url: '/lista-de-pratos-vegano',
      icon: 'nutrition'
    },

    {
      title: 'Cardápio Vegetariano',
      url: '/lista-de-pratos-vegetariano',
      icon: 'nutrition'
    },


    {
      title: 'Carrinho',
      url: '/carrinho',
      icon: 'cart'
    },

    {
      title: 'Perfil',
      url: '/perfil',
      icon: 'person'
    },
  

  ];
  // 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebaseauth: AngularFireAuth,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.firebaseauth.authState
      .subscribe(obj => {

        this.idUsuario = this.firebaseauth.auth.currentUser.uid;
        this.usuarioEmail = this.firebaseauth.auth.currentUser.email;
        console.log(this.idUsuario)
        this.downloadFoto();
      }



      )
  };



  Perfil() {
    this.router.navigate(['/perfil']);
  }

  ngOnInit() {

  }


  downloadFoto() {
    let ref = firebase.storage().ref()
      .child(`perfil/${this.idUsuario}.jpg`);

    ref.getDownloadURL().then(url => {
      this.picture = url;
    })
  }

}
