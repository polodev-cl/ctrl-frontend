import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEquipamientoComponent } from './editar-equipamiento.component';

describe('EditarEquipamientoComponent', () => {
  let component: EditarEquipamientoComponent;
  let fixture: ComponentFixture<EditarEquipamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarEquipamientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarEquipamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
