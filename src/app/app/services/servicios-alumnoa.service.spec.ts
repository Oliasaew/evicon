import { TestBed } from '@angular/core/testing';

import { ServiciosAlumnoaService } from './servicios-alumnoa.service';

describe('ServiciosAlumnoaService', () => {
  let service: ServiciosAlumnoaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosAlumnoaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
