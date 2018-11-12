import { TestBed, inject } from '@angular/core/testing';

import { SidenavItemsService } from './sidenav-items.service';

describe('SidenavItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidenavItemsService]
    });
  });

  it('should be created', inject([SidenavItemsService], (service: SidenavItemsService) => {
    expect(service).toBeTruthy();
  }));
});
