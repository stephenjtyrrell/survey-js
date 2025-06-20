import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-survey-config-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Survey Config Records</h2>
    <ul>
      <li *ngFor="let record of records">
        <strong>ID:</strong> {{ record.id }}<br />
        <pre>{{ record.json | json }}</pre>
      </li>
    </ul>
    <div *ngIf="!records.length" style="color: #888;">No survey config records found.</div>
  `
})
export class SurveyConfigListComponent {
  records: any[] = [];
  constructor(private http: HttpClient) {
    this.http.get<any[]>('/api/survey-configs').subscribe(data => this.records = data);
  }
}
