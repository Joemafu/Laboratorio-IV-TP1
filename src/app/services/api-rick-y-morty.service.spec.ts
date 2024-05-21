import { TestBed } from '@angular/core/testing';

import { ApiRickYMortyService } from './api-rick-y-morty.service';

describe('ApiRickYMortyService', () => {
  let service: ApiRickYMortyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRickYMortyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
