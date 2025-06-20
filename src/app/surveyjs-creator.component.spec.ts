import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SurveyjsCreatorComponent } from './surveyjs-creator.component';

describe('SurveyjsCreatorComponent', () => {
  let component: SurveyjsCreatorComponent;
  let fixture: ComponentFixture<SurveyjsCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyjsCreatorComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(SurveyjsCreatorComponent);
    component = fixture.componentInstance;
  });

  it('should create the SurveyJS Creator component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Survey Creator UI', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('survey-creator')).toBeTruthy();
  });
});
