import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaIndividualComponent } from './consulta-individual.component';

describe('ConsultaIndividualComponent', () => {
  let component: ConsultaIndividualComponent;
  let fixture: ComponentFixture<ConsultaIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultaIndividualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
