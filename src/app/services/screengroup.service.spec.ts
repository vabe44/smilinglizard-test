import { TestBed, inject } from '@angular/core/testing';

import { ScreengroupService } from './screengroup.service';

describe('ScreengroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScreengroupService]
    });
  });

  it('should be created', inject([ScreengroupService], (service: ScreengroupService) => {
    expect(service).toBeTruthy();
  }));
});
