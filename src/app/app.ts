import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SurveyModule } from 'survey-angular-ui';
import { Model } from 'survey-core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ResponsesComponent } from './responses.component';
import { surveyJson } from './survey-json';
import { SurveyApiService } from './survey-api.service';
import { ToastComponent } from './toast.component';
import { RouterModule, Router } from '@angular/router';
import { SurveyConfigService } from './survey-config.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [SurveyModule, HttpClientModule, CommonModule, ResponsesComponent, ToastComponent, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  surveyModel!: Model;
  editingId: string | null = null;
  showGrid = true;
  loading = false;
  toastMessage = '';
  toastError = false;
  toastTimeout: any;
  configSub?: Subscription;
  @ViewChild('responsesComp') responsesComponentRef?: ResponsesComponent;

  constructor(private api: SurveyApiService, private http: HttpClient, private configService: SurveyConfigService, public router: Router) {}

  ngOnInit() {
    this.loadSurveyConfig();
    this.configSub = this.configService.configUpdated$.subscribe(() => this.loadSurveyConfig());
  }

  ngOnDestroy() {
    this.configSub?.unsubscribe();
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

  loadSurveyConfig() {
    // Add a cache-busting query param to force a hard refresh of the JSON
    const url = `/api/survey-config?cb=${Date.now()}`;
    this.http.get(url).subscribe({
      next: (config) => this.createSurvey(undefined, config),
      error: () => this.createSurvey()
    });
  }

  createSurvey(data?: any, config?: any) {
    const survey = new Model(config || surveyJson);
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
            this.ngOnInit();
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
            this.ngOnInit();
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
