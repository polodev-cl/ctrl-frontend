import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablasEditarUsuarioComponent } from './tablas-editar-usuario.component';

describe('TablasEditarUsuarioComponent', () => {
  let component: TablasEditarUsuarioComponent;
  let fixture: ComponentFixture<TablasEditarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablasEditarUsuarioComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TablasEditarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
