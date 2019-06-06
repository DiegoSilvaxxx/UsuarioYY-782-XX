import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CarrinhoVegetarianoPage } from './carrinho-vegetariano.page';

const routes: Routes = [
  {
    path: '',
    component: CarrinhoVegetarianoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CarrinhoVegetarianoPage]
})
export class CarrinhoVegetarianoPageModule {}
