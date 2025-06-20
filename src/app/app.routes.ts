import { Routes } from '@angular/router';
import { SurveyConfigComponent } from './survey-config.component';
import { SurveyConfigListComponent } from './survey-config-list.component';
import { EditSurveyComponent } from './edit-survey.component';
import { SurveyjsCreatorComponent } from './surveyjs-creator.component';

export const routes: Routes = [
  { path: 'survey-config', component: SurveyConfigComponent },
  { path: 'survey-configs', component: SurveyConfigListComponent },
  { path: 'edit-survey', component: EditSurveyComponent },
  { path: 'surveyjs-creator', component: SurveyjsCreatorComponent },
];
