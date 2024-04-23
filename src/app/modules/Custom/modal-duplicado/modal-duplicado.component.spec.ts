import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDuplicadoComponent } from './modal-duplicado.component';

describe('ModalDuplicadoComponent', () => {
  let component: ModalDuplicadoComponent;
  let fixture: ComponentFixture<ModalDuplicadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDuplicadoComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalDuplicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
