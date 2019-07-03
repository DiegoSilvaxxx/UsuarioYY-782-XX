import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDePratosCmPage } from './lista-de-pratos-cm.page';

describe('ListaDePratosCmPage', () => {
  let component: ListaDePratosCmPage;
  let fixture: ComponentFixture<ListaDePratosCmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDePratosCmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDePratosCmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
