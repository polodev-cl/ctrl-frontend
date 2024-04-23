import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeroInventarioComponent } from './numero-inventario.component';

describe('NumeroInventarioComponent', () => {
  let component: NumeroInventarioComponent;
  let fixture: ComponentFixture<NumeroInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumeroInventarioComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NumeroInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
