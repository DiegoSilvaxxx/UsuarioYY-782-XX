import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaDeParceriasCmPage } from './lista-de-parcerias-cm.page';

const routes: Routes = [
  {
    path: '',
    component: ListaDeParceriasCmPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaDeParceriasCmPage]
})
export class ListaDeParceriasCmPageModule {}
