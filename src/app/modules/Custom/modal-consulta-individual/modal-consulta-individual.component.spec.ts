import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConsultaIndividualComponent } from './modal-consulta-individual.component';

describe('ModalConsultaIndividualComponent', () => {
  let component: ModalConsultaIndividualComponent;
  let fixture: ComponentFixture<ModalConsultaIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalConsultaIndividualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalConsultaIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
