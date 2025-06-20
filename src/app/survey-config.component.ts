import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SurveyConfigService } from './survey-config.service';

@Component({
  selector: 'app-survey-config',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Survey Configuration</h2>
    <p>To edit the survey JSON, go to <a routerLink="/edit-survey">Edit Survey</a>.</p>
  `
})
export class SurveyConfigComponent {
  constructor(private http: HttpClient, private router: Router, private configService: SurveyConfigService) {}
}
