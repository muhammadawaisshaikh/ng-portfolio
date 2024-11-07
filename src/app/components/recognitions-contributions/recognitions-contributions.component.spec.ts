import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecognitionsContributionsComponent } from './recognitions-contributions.component';

describe('RecognitionsContributionsComponent', () => {
  let component: RecognitionsContributionsComponent;
  let fixture: ComponentFixture<RecognitionsContributionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecognitionsContributionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecognitionsContributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
