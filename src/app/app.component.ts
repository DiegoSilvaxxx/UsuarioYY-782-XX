import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
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
      title: 'Lista de Clientes',
      url: '/lista-de-clientes',
      icon: 'body'
    },
    {
      title: 'Cadastro de Clientes',
      url: '/cadastro-de-cliente',
      icon: 'book'
    },
    {
      title: 'Cadastrar Prato',
      url: '/cadastro-de-prato',
      icon: 'clipboard'
    },
    {
      title: 'Cardápio',
      url: '/lista-de-pratos',
      icon: 'nutrition'
    },

    {
      title: 'Cadastrar PratoVegano',
      url: '/cadastro-de-prato-vegano',
      icon: 'clipboard'
    },

    {
      title: 'Cadastrar PratoVegetariano',
      url: '/cadastro-de-prato-vegetariano',
      icon: 'clipboard'
    },

    {
      title: 'Carrinho',
      url: '/carrinho',
      icon: 'cart'
    },
    {
      title: 'Lista Promoções !',
      url: '/lista-de-promocoes',
      icon: 'cart'
    },
    {
      title: 'Cadastro Promoçaõ',
      url: '/cadastro-de-promocao',
      icon: 'clipboard'
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
      .subscribe(
        user => {
          if (user) {
            this.router.navigate(['/list']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        () => {
          this.router.navigate(['/list']);
        }
      );

  }
}
