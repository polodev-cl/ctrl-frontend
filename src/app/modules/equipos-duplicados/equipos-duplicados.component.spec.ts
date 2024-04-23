import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposDuplicadosComponent } from './equipos-duplicados.component';

describe('EquiposDuplicadosComponent', () => {
  let component: EquiposDuplicadosComponent;
  let fixture: ComponentFixture<EquiposDuplicadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquiposDuplicadosComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EquiposDuplicadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
