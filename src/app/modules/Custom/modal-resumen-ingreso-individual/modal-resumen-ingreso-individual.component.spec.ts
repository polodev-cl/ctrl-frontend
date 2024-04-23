import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResumenIngresoIndividualComponent } from './modal-resumen-ingreso-individual.component';

describe('ModalResumenIngresoIndividualComponent', () => {
  let component: ModalResumenIngresoIndividualComponent;
  let fixture: ComponentFixture<ModalResumenIngresoIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalResumenIngresoIndividualComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalResumenIngresoIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
