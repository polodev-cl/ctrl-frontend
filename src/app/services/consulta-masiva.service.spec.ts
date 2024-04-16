import { TestBed } from '@angular/core/testing';

import { ConsultaMasivaService } from './consulta-masiva.service';

describe('ConsultaMasivaService', () => {
  let service: ConsultaMasivaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaMasivaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
