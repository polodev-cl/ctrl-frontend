import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewlinePipe, TablasHistorialEquipoComponent } from './tablas-historial-equipo.component'; // Asegúrate de tener la ruta correcta al Pipe

describe('TablasHistorialEquipoComponent', () => {
  let component: TablasHistorialEquipoComponent;
  let fixture: ComponentFixture<TablasHistorialEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TablasHistorialEquipoComponent,
        NewlinePipe
      ]

    })
      .compileComponents();

    fixture = TestBed.createComponent(TablasHistorialEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
