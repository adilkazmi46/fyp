import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightsRssComponent } from './insights-rss.component';

describe('InsightsRssComponent', () => {
  let component: InsightsRssComponent;
  let fixture: ComponentFixture<InsightsRssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsightsRssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsightsRssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
