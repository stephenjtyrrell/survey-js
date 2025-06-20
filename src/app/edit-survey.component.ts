import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SurveyConfigService } from './survey-config.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-survey',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Edit Survey JSON</h2>
    <ng-container [ngSwitch]="step">
      <form *ngSwitchCase="1">
        <label>Step 1: Edit Survey JSON</label><br />
        <textarea [(ngModel)]="jsonText" name="jsonText" rows="20" placeholder="Paste or edit your survey JSON here..."></textarea>
        <br />
        <button type="button" (click)="nextStep()">Next</button>
      </form>
      <div *ngSwitchCase="2">
        <label>Step 2: Review Survey JSON</label>
        <pre>{{ jsonText }}</pre>
        <button type="button" (click)="prevStep()">Back</button>
        <button type="button" (click)="save()">Save</button>
      </div>
      <div *ngSwitchCase="3">
        <label>Step 3: Confirmation</label>
        <div *ngIf="message" style="color: #19b394;">{{ message }}</div>
        <div *ngIf="error" style="color: #e74c3c;">{{ error }}</div>
        <button type="button" (click)="reset()">Edit Again</button>
      </div>
    </ng-container>
  `
})
export class EditSurveyComponent {
  jsonText = '';
  message = '';
  error = '';
  step = 1;

  constructor(private http: HttpClient, private configService: SurveyConfigService, public router: Router) {
    this.load();
  }

  load() {
    this.http.get('/api/survey-config').subscribe({
      next: data => this.jsonText = JSON.stringify(data, null, 2),
      error: err => this.error = 'Failed to load config: ' + (err?.error?.error || err.message || err)
    });
  }

  nextStep() {
    this.step = 2;
  }

  prevStep() {
    this.step = 1;
  }

  save() {
    try {
      const parsed = JSON.parse(this.jsonText);
      this.http.put('/api/survey-config', parsed).subscribe({
        next: () => {
          this.message = 'Saved!';
          this.error = '';
          this.step = 3;
          this.router.navigate(['/']); // Redirect to home after save
        },
        error: err => {
          this.error = 'Failed to save: ' + (err?.error?.error || err.message || err);
          this.message = '';
        }
      });
    } catch (e) {
      this.error = 'Invalid JSON';
      this.message = '';
    }
  }

  reset() {
    this.message = '';
    this.error = '';
    this.step = 1;
  }
}
