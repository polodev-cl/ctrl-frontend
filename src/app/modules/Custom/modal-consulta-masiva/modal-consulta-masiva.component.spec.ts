import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConsultaMasivaComponent } from './modal-consulta-masiva.component';

describe('ModalConsultaMasivaComponent', () => {
  let component: ModalConsultaMasivaComponent;
  let fixture: ComponentFixture<ModalConsultaMasivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalConsultaMasivaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalConsultaMasivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
