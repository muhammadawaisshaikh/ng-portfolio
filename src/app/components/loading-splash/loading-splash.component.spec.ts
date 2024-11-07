import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSplashComponent } from './loading-splash.component';

describe('LoadingSplashComponent', () => {
  let component: LoadingSplashComponent;
  let fixture: ComponentFixture<LoadingSplashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSplashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingSplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
