import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaDePratosVegetarianoCmPage } from './lista-de-pratos-vegetariano-cm.page';

const routes: Routes = [
  {
    path: '',
    component: ListaDePratosVegetarianoCmPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaDePratosVegetarianoCmPage]
})
export class ListaDePratosVegetarianoCmPageModule {}
