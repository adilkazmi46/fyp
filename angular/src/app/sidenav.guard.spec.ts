import { TestBed, async, inject } from '@angular/core/testing';

import { SidenavGuard } from './sidenav.guard';

describe('SidenavGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidenavGuard]
    });
  });

  it('should ...', inject([SidenavGuard], (guard: SidenavGuard) => {
    expect(guard).toBeTruthy();
  }));
});
