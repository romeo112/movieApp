import { TestBed } from '@angular/core/testing';

import { TvshowsService } from './tvshows.service';

describe('TvshowsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TvshowsService = TestBed.get(TvshowsService);
    expect(service).toBeTruthy();
  });
});
