import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Finalizar } from '../model/finalizar';
import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.page.html',
  styleUrls: ['./finalizar-compra.page.scss'],
})
export class FinalizarCompraPage implements OnInit {



  finalizar: Finalizar = new Finalizar();
  id: string;
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  formGroup: FormGroup; // <----


  constructor(public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    public router: Router,
    public nav: NavController) {// <----
    this.id = this.activatedRoute.snapshot.paramMap.get('finalizar');
    console.log(this.id)
    this.form(); // <----
  }

  form() {// <----
    this.formGroup = this.formBuilder.group({
      nome: [this.finalizar.nome],
      endereco: [this.finalizar.endereco],
      bairro: [this.finalizar.bairro],
      cidade: [this.finalizar.cidade],
      cep: [this.finalizar.cep],
      cpf: [this.finalizar.cpf],
      telefone: [this.finalizar.telefone],
      email: [this.finalizar.email],
    });
  }

  ngOnInit() {

  }



  Carrinho() {
    this.router.navigate(['/carrinho']);
  }

  subimtForm() {
    console.log(this.formGroup.value)

    console.log('ok');
    let ref = this.firestore.collection('finalizar')
    ref.add(this.formGroup.value)
      .then(() => {
        console.log('Enviado com Sucesso');
        this.toast('Compra Feita com Sucesso');

        this.router.navigate(['/carrinho']);
      }).catch(() => {
        console.log('Erro ao enviar');
      })
  }

  async toast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();

  }

}



