import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoIndividualComponent } from './ingreso-individual.component';

describe('IngresoIndividualComponent', () => {
  let component: IngresoIndividualComponent;
  let fixture: ComponentFixture<IngresoIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngresoIndividualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngresoIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
