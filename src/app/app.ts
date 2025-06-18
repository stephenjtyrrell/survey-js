import { Component, OnInit, ViewChild } from '@angular/core';
import { SurveyModule } from 'survey-angular-ui';
import { Model } from 'survey-core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ResponsesComponent } from './responses.component';
import { surveyJson } from './survey-json';

@Component({
  selector: 'app-root',
  imports: [SurveyModule, HttpClientModule, CommonModule, ResponsesComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  surveyModel!: Model;
  editingId: string | null = null;
  showGrid = true;
  @ViewChild('responsesComp') responsesComponentRef?: ResponsesComponent;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.createSurvey();
  }

  createSurvey(data?: any) {
    const survey = new Model(surveyJson);
    if (data) {
      survey.data = data;
    }
    survey.completeText = this.editingId ? 'Update' : 'Complete';
    this.surveyModel = survey;
    survey.onComplete.add((sender) => {
      if (this.editingId) {
        const id = this.editingId;
        this.http.put(`http://localhost:3001/api/response/${id}`, sender.data).subscribe({
          next: () => {
            alert('Survey response updated!');
            this.refreshResponses();
            this.editingId = null;
            this.createSurvey();
          },
          error: (err) => {
            alert('Failed to update response. ' + (err?.error?.error || err.message || ''));
          }
        });
      } else {
        this.http.post('http://localhost:3001/api/response', sender.data).subscribe({
          next: () => {
            alert('Survey response submitted!');
            this.refreshResponses();
            this.createSurvey();
          },
          error: (err) => {
            alert('Failed to submit response. ' + (err?.error?.error || err.message || ''));
          }
        });
      }
    });
  }

  onLoadResponse(event: { response: any; id: string }) {
    this.editingId = event.id;
    this.createSurvey(event.response);
  }

  refreshResponses() {
    this.responsesComponentRef?.refresh();
  }
}
