import { TestBed } from '@angular/core/testing';

import { MatSelectFilterService } from './mat-select-filter.service';
import { beforeEach, describe } from 'node:test';


describe('MatSelectFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatSelectFilterService = TestBed.get(MatSelectFilterService);
    expect(service).toBeTruthy();
  });
});
