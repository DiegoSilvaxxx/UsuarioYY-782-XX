import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-de-cliente',
  templateUrl: './cadastro-de-cliente.page.html',
  styleUrls: ['./cadastro-de-cliente.page.scss'],
})
export class CadastroDeClientePage implements OnInit {

  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};
  formGroup : FormGroup;
  
  constructor(private formBuilder : FormBuilder, 
    private router : Router) {
     
    this.formGroup = this.formBuilder.group({
      nome : [''],
      telefone : [''],
      email : [''],
    });
    
   }

  ngOnInit() {
    
  }

  cadastrar(){
    console.log('ok');
    let ref = this.firestore.collection('cliente')
    ref.add(this.formGroup.value)
      .then(() =>{
        console.log('Cadastrado com sucesso');
        this.router.navigate(['/cadastroperfil']);
      }).catch(()=>{
        console.log('Erro ao cadastrar');
      })
  }

}
