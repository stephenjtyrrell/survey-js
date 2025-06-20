import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SurveyConfigComponent } from './survey-config.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('SurveyConfigComponent', () => {
  let component: SurveyConfigComponent;
  let fixture: ComponentFixture<SurveyConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyConfigComponent, HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(SurveyConfigComponent);
    component = fixture.componentInstance;
  });

  it('should create the SurveyConfigComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render the edit survey link', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Edit Survey');
  });
});
