import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEquiposDuplicadosComponent } from './tabla-equipos-duplicados.component';

describe('TablaEquiposDuplicadosComponent', () => {
  let component: TablaEquiposDuplicadosComponent;
  let fixture: ComponentFixture<TablaEquiposDuplicadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaEquiposDuplicadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaEquiposDuplicadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
