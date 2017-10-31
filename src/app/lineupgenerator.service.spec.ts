import { TestBed, inject } from '@angular/core/testing';

import { LineupgeneratorService } from './lineupgenerator.service';

describe('LineupgeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LineupgeneratorService]
    });
  });

  it('should be created', inject([LineupgeneratorService], (service: LineupgeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
