import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Auth2Guard } from './service/auth2.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule',
    canActivate: [Auth2Guard]
  },
  { path: 'logoff', 
    loadChildren: './logoff/logoff.module#LogoffPageModule',
    canActivate: [Auth2Guard] 
  },
  { path: 'lista-de-clientes', loadChildren: './lista-de-clientes/lista-de-clientes.module#ListaDeClientesPageModule' },
  { path: 'cadastro-de-cliente', loadChildren: './cadastro-de-cliente/cadastro-de-cliente.module#CadastroDeClientePageModule' },
  { path: 'cliente-view', loadChildren: './cliente-view/cliente-view.module#ClienteViewPageModule' },
 
  { path: 'cadastro-de-prato', loadChildren: './cadastro-de-prato/cadastro-de-prato.module#CadastroDePratoPageModule' },
  { path: 'prato-view', loadChildren: './prato-view/prato-view.module#PratoViewPageModule' },
  { path: 'lista-de-pratos', loadChildren: './lista-de-pratos/lista-de-pratos.module#ListaDePratosPageModule' },
  { path: 'lista-de-pratos-vegano', loadChildren: './lista-de-pratos-vegano/lista-de-pratos-vegano.module#ListaDePratosVeganoPageModule' },
  { path: 'lista-de-pratos-vegetariano', loadChildren: './lista-de-pratos-vegetariano/lista-de-pratos-vegetariano.module#ListaDePratosVegetarianoPageModule' },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
