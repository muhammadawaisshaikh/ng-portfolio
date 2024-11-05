import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteScrollingItemsComponent } from './infinite-scrolling-items.component';

describe('InfiniteScrollingItemsComponent', () => {
  let component: InfiniteScrollingItemsComponent;
  let fixture: ComponentFixture<InfiniteScrollingItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfiniteScrollingItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfiniteScrollingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
