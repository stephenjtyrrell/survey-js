import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SurveyConfigListComponent } from './survey-config-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SurveyConfigListComponent', () => {
  let component: SurveyConfigListComponent;
  let fixture: ComponentFixture<SurveyConfigListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyConfigListComponent, HttpClientTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(SurveyConfigListComponent);
    component = fixture.componentInstance;
  });

  it('should create the SurveyConfigListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Survey Config Records header', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Survey Config Records');
  });
});
