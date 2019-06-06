import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhoVeganoPage } from './carrinho-vegano.page';

describe('CarrinhoVeganoPage', () => {
  let component: CarrinhoVeganoPage;
  let fixture: ComponentFixture<CarrinhoVeganoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrinhoVeganoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrinhoVeganoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
