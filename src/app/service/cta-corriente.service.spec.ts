import { TestBed } from '@angular/core/testing';

import { CtaCorrienteService } from './cta-corriente.service';

describe('CtaCorrienteService', () => {
  let service: CtaCorrienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CtaCorrienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
