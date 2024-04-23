import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExitosoComponent } from './modal-exitoso.component';

describe('ModalExitosoComponent', () => {
  let component: ModalExitosoComponent;
  let fixture: ComponentFixture<ModalExitosoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalExitosoComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalExitosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
