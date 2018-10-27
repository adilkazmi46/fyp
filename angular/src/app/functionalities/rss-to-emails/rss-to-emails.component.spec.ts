import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RssToEmailsComponent } from './rss-to-emails.component';

describe('RssToEmailsComponent', () => {
  let component: RssToEmailsComponent;
  let fixture: ComponentFixture<RssToEmailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RssToEmailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RssToEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
