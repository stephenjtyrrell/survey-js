import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyCreatorModule } from 'survey-creator-angular';
import { SurveyCreatorModel } from 'survey-creator-core'; // SurveyJS styles are imported globally in styles.css

@Component({
  selector: 'app-surveyjs-creator',
  standalone: true,
  imports: [CommonModule, SurveyCreatorModule],
  template: `
    <h2>SurveyJS Form Creator</h2>
    <div style="height: 90vh;">
      <survey-creator [model]="creator"></survey-creator>
    </div>
  `
})
export class SurveyjsCreatorComponent implements OnInit {
  creator!: SurveyCreatorModel;

  ngOnInit() {
    const options = {
      showLogicTab: true,
      showTranslationTab: true,
      isAutoSave: true
    };
    this.creator = new SurveyCreatorModel(options);
  }
}
