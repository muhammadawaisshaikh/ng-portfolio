import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechSpeakingDetailsComponent } from './tech-speaking-details.component';

describe('TechSpeakingDetailsComponent', () => {
  let component: TechSpeakingDetailsComponent;
  let fixture: ComponentFixture<TechSpeakingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechSpeakingDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechSpeakingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
