import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditSurveyComponent } from './edit-survey.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditSurveyComponent', () => {
  let component: EditSurveyComponent;
  let fixture: ComponentFixture<EditSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSurveyComponent, HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(EditSurveyComponent);
    component = fixture.componentInstance;
  });

  it('should create the EditSurveyComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render the multi-step form', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Edit Survey JSON');
  });
});
