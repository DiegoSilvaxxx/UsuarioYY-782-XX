import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Perfil } from '../model/perfil';
import { Usuario } from '../model/usuario';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage {

  idUsuario: string;
  usuarioEmail: string;

  picture: string = "../../assets/imagens/1.gif";

  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true }

  usuario: Usuario = new Usuario();

  id: string;


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

  constructor(public navctrl: NavController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebaseauth: AngularFireAuth,
    public router: Router
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

        this.id = this.firebaseauth.auth.currentUser.uid;
        this.idUsuario = this.firebaseauth.auth.currentUser.uid;
        this.usuarioEmail = this.firebaseauth.auth.currentUser.email;
        console.log(this.idUsuario)
        this.downloadFoto();
      }



      )
  };


  ngOnInit() {
    this.obterPerfil();
  }

  downloadFoto() {
    let ref = firebase.storage().ref()
      .child(`perfil/${this.idUsuario}.jpg`);

    ref.getDownloadURL().then(url => {
      this.picture = url;
    })
  }



  obterPerfil() {
    var ref = firebase.firestore().collection("usuario").doc(this.id);
    ref.get().then(doc => {
      this.usuario.setDados(doc.data());

      console.log(this.usuario);

    }).catch((error) => {
      console.log("Error getting document:", error);


    });
  }

  HomeCm() {
    this.router.navigate(['/lista-de-pratos']);
  }

  HomeAdm() {
    this.router.navigate(['/lista-de-pratos-cm']);
  }
  Perfil() {
    this.router.navigate(['/perfil']);
  }

  cadastrar() {

    this.router.navigate(['/perfil', { id: '12' }]);


  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}