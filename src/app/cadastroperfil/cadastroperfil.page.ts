import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-cadastroperfil',
  templateUrl: './cadastroperfil.page.html',
  styleUrls: ['./cadastroperfil.page.scss'],
})
export class CadastroperfilPage implements OnInit {

  idUsuario;

  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  formGroup: FormGroup;

  constructor(public formBuilder: FormBuilder,
    public router: Router,

    private firebaseauth: AngularFireAuth) {

    this.firebaseauth.authState.subscribe(obj => {

      this.idUsuario = this.firebaseauth.auth.currentUser.uid;

    })





    this.formGroup = this.formBuilder.group({
      nome: [''],
      sobrenome: [''],
      cel: [''],
      cidade: [''],

    })
  }

  ngOnInit() {
  }

  entrar() {
    console.log('ok');
    let ref = this.firestore.collection('perfil').doc(this.idUsuario)
    ref.set(this.formGroup.value)
      .then(() => {
        console.log('Entrada do Perfil com sucesso');
        this.router.navigate(['/perfil']);
      }).catch(() => {
        console.log('Erro ao Cadastrar')

      })
  }



}