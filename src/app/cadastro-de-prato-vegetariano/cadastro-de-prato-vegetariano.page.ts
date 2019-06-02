import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastro-de-prato-vegetariano',
  templateUrl: './cadastro-de-prato-vegetariano.page.html',
  styleUrls: ['./cadastro-de-prato-vegetariano.page.scss'],
})
export class CadastroDePratoVegetarianoPage implements OnInit {

  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};
  formGroup : FormGroup;
  
  constructor(private formBuilder : FormBuilder, 
    private router : Router) {
     
    this.formGroup = this.formBuilder.group({
      nome : [''],
      descricao : [''],
      valor : [''],
    });
    
   }

  ngOnInit() {
    
  }

  cadastrar(){
    console.log('ok');
    let ref = this.firestore.collection('pratovegetariano')
    ref.add(this.formGroup.value)
      .then(() =>{
        console.log('Cadastrado com sucesso');
        this.router.navigate(['/list']);
      }).catch(err=>{
        console.log(err);
        console.log('Erro ao cadastrar');
      })
  }

}
