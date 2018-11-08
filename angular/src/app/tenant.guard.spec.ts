import { TestBed, async, inject } from '@angular/core/testing';

import { TenantGuard } from './tenant.guard';

describe('TenantGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TenantGuard]
    });
  });

  it('should ...', inject([TenantGuard], (guard: TenantGuard) => {
    expect(guard).toBeTruthy();
  }));
});
