import { TenantRoutingModule } from './tenant-routing.module';

describe('TenantRoutingModule', () => {
  let tenantRoutingModule: TenantRoutingModule;

  beforeEach(() => {
    tenantRoutingModule = new TenantRoutingModule();
  });

  it('should create an instance', () => {
    expect(tenantRoutingModule).toBeTruthy();
  });
});
