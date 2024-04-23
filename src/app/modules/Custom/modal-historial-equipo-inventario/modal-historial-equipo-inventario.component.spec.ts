import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistorialEquipoInventarioComponent } from './modal-historial-equipo-inventario.component';

describe('ModalHistorialEquipoInventarioComponent', () => {
  let component: ModalHistorialEquipoInventarioComponent;
  let fixture: ComponentFixture<ModalHistorialEquipoInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHistorialEquipoInventarioComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalHistorialEquipoInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
