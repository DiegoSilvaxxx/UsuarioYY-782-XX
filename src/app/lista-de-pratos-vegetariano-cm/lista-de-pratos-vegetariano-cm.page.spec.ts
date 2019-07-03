import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDePratosVegetarianoCmPage } from './lista-de-pratos-vegetariano-cm.page';

describe('ListaDePratosVegetarianoCmPage', () => {
  let component: ListaDePratosVegetarianoCmPage;
  let fixture: ComponentFixture<ListaDePratosVegetarianoCmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDePratosVegetarianoCmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDePratosVegetarianoCmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
