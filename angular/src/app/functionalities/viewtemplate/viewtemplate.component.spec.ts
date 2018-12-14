import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtemplateComponent } from './viewtemplate.component';

describe('ViewtemplateComponent', () => {
  let component: ViewtemplateComponent;
  let fixture: ComponentFixture<ViewtemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewtemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
