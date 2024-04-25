import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDpcComponent } from './tabla-dpc.component';

describe('TablaDpcComponent', () => {
  let component: TablaDpcComponent;
  let fixture: ComponentFixture<TablaDpcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaDpcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaDpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
