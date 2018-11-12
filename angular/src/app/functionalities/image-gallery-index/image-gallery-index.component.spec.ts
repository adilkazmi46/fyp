import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGalleryIndexComponent } from './image-gallery-index.component';

describe('ImageGalleryIndexComponent', () => {
  let component: ImageGalleryIndexComponent;
  let fixture: ComponentFixture<ImageGalleryIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageGalleryIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageGalleryIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
