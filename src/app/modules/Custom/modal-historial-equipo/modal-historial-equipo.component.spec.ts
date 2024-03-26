import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistorialEquipoComponent } from './modal-historial-equipo.component';

describe('ModalHistorialEquipoComponent', () => {
  let component: ModalHistorialEquipoComponent;
  let fixture: ComponentFixture<ModalHistorialEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalHistorialEquipoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalHistorialEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
