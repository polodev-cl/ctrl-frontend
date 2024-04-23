import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaMasivaComponent } from './consulta-masiva.component';

describe('ConsultaMasivaComponent', () => {
  let component: ConsultaMasivaComponent;
  let fixture: ComponentFixture<ConsultaMasivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaMasivaComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConsultaMasivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
