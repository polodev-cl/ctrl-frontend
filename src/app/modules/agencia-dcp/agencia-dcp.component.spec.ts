import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenciaDcpComponent } from './agencia-dcp.component';

describe('AgenciaDcpComponent', () => {
  let component: AgenciaDcpComponent;
  let fixture: ComponentFixture<AgenciaDcpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgenciaDcpComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AgenciaDcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
