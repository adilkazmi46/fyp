import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RssToEmailsIndexComponent } from './rss-to-emails-index.component';

describe('RssToEmailsIndexComponent', () => {
  let component: RssToEmailsIndexComponent;
  let fixture: ComponentFixture<RssToEmailsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RssToEmailsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RssToEmailsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
