import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyTalksComponent } from './technology-talks.component';

describe('TechnologyTalksComponent', () => {
  let component: TechnologyTalksComponent;
  let fixture: ComponentFixture<TechnologyTalksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologyTalksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnologyTalksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
