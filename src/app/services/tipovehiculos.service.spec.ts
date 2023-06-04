import { TestBed } from '@angular/core/testing';

import { TipovehiculosService } from './tipovehiculos.service';

describe('TipovehiculosService', () => {
  let service: TipovehiculosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipovehiculosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
