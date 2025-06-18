import { Component, OnInit, ViewChild } from '@angular/core';
import { SurveyModule } from 'survey-angular-ui';
import { Model } from 'survey-core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ResponsesComponent } from './responses.component';
import { surveyJson } from './survey-json';
import { SurveyApiService } from './survey-api.service';
import { ToastComponent } from './toast.component';

@Component({
  selector: 'app-root',
  imports: [SurveyModule, HttpClientModule, CommonModule, ResponsesComponent, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  surveyModel!: Model;
  editingId: string | null = null;
  showGrid = true;
  loading = false;
  toastMessage = '';
  toastError = false;
  toastTimeout: any;
  @ViewChild('responsesComp') responsesComponentRef?: ResponsesComponent;

  constructor(private api: SurveyApiService) {}

  ngOnInit() {
    this.createSurvey();
  }

  showToast(message: string, error = false) {
    this.toastMessage = message;
    this.toastError = error;
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastMessage = '';
      this.toastError = false;
    }, 3000);
  }

  createSurvey(data?: any) {
    const survey = new Model(surveyJson);
    if (data) {
      survey.data = data;
    }
    survey.completeText = this.editingId ? 'Update' : 'Complete';
    this.surveyModel = survey;
    survey.onComplete.add((sender) => {
      this.loading = true;
      if (this.editingId) {
        const id = this.editingId;
        this.api.updateResponse(id, sender.data).subscribe({
          next: () => {
            this.showToast('Survey response updated!');
            this.refreshResponses();
            this.editingId = null;
            this.createSurvey();
            this.loading = false;
          },
          error: (err) => {
            this.showToast('Failed to update response. ' + (err?.error?.error || err.message || ''), true);
            this.loading = false;
          }
        });
      } else {
        this.api.addResponse(sender.data).subscribe({
          next: () => {
            this.showToast('Survey response submitted!');
            this.refreshResponses();
            this.createSurvey();
            this.loading = false;
          },
          error: (err) => {
            this.showToast('Failed to submit response. ' + (err?.error?.error || err.message || ''), true);
            this.loading = false;
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
