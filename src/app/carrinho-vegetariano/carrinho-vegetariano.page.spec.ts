import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhoVegetarianoPage } from './carrinho-vegetariano.page';

describe('CarrinhoVegetarianoPage', () => {
  let component: CarrinhoVegetarianoPage;
  let fixture: ComponentFixture<CarrinhoVegetarianoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrinhoVegetarianoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrinhoVegetarianoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
