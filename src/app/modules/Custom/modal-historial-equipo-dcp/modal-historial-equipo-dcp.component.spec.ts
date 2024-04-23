import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistorialEquipoDcpComponent } from './modal-historial-equipo-dcp.component';

describe('ModalHistorialEquipoDcpComponent', () => {
  let component: ModalHistorialEquipoDcpComponent;
  let fixture: ComponentFixture<ModalHistorialEquipoDcpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHistorialEquipoDcpComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalHistorialEquipoDcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
