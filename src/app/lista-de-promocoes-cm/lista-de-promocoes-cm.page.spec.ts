import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDePromocoesCmPage } from './lista-de-promocoes-cm.page';

describe('ListaDePromocoesCmPage', () => {
  let component: ListaDePromocoesCmPage;
  let fixture: ComponentFixture<ListaDePromocoesCmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDePromocoesCmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDePromocoesCmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
