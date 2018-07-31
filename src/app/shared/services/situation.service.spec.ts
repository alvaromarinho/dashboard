import { TestBed, inject } from '@angular/core/testing';

import { SituationService } from './situation.service';

describe('SituationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SituationService]
    });
  });

  it('should be created', inject([SituationService], (service: SituationService) => {
    expect(service).toBeTruthy();
  }));
});
