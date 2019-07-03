import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDePratosVeganoCmPage } from './lista-de-pratos-vegano-cm.page';

describe('ListaDePratosVeganoCmPage', () => {
  let component: ListaDePratosVeganoCmPage;
  let fixture: ComponentFixture<ListaDePratosVeganoCmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDePratosVeganoCmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDePratosVeganoCmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
