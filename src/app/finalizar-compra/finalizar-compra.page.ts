import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.page.html',
  styleUrls: ['./finalizar-compra.page.scss'],
})
export class FinalizarCompraPage implements OnInit {

  constructor(public storageServ: StorageService,
              public router: Router) { }

  ngOnInit() {
  }

  Carrinho() {
    this.router.navigate(['/carrinho']);
  }

  }
