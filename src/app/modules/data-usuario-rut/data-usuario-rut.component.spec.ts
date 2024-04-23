import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUsuarioRutComponent } from './data-usuario-rut.component';

describe('DataUsuarioRutComponent', () => {
  let component: DataUsuarioRutComponent;
  let fixture: ComponentFixture<DataUsuarioRutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataUsuarioRutComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DataUsuarioRutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
