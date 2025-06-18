import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SurveyApiService } from './survey-api.service';
import { SurveyResponse } from './survey-response.model';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-responses',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  template: `
    <table *ngIf="responses.length; else noData">
      <thead>
        <tr>
          <th style="width: 40px;"></th>
          <th>#</th>
          <th>Date</th>
          <th>Response</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of responses; let i = index">
          <td></td>
          <td>{{ i + 1 }}</td>
          <td>{{ item.date }}</td>
          <td><pre>{{ item.response | json }}</pre></td>
          <td><button (click)="startEdit(i, item)">Edit</button> <button (click)="deleteResponse(item.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
    <ng-template #noData>
      <p>No responses yet.</p>
    </ng-template>
  `,
  styles: [`
    :host ::ng-deep .sv-container {
      margin-bottom: 2rem;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(44,62,80,0.10);
      padding: 2rem;
      font-family: var(--sjs-font-family, Arial, sans-serif);
    }
    table {
      border-collapse: separate;
      border-spacing: 0;
      width: 100%;
      margin-top: 1rem;
      background: #f9fbfc;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(44,62,80,0.06);
    }
    th, td {
      border-bottom: 1px solid #e4e4e4;
      padding: 12px 16px;
      text-align: left;
      font-size: 1.05em;
    }
    th {
      background: #19b394;
      color: #fff;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    tr:last-child td {
      border-bottom: none;
    }
    tr:nth-child(even) {
      background: #f3f7f9;
    }
    h2 {
      color: #2c3e50;
      margin-bottom: 1rem;
      font-size: 1.5em;
      font-weight: 700;
    }
    button {
      background: #19b394;
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 7px 18px;
      cursor: pointer;
      font-size: 1em;
      transition: background 0.2s;
      box-shadow: 0 1px 3px rgba(44,62,80,0.08);
    }
    button:hover {
      background: #179d82;
    }
    pre {
      background: #f4f8fa;
      border-radius: 4px;
      padding: 8px 12px;
      font-size: 0.98em;
      margin: 0;
      color: #2c3e50;
      max-width: 400px;
      overflow-x: auto;
    }
  `]
})
export class ResponsesComponent implements OnInit {
  responses: SurveyResponse[] = [];
  @Output() loadResponse = new EventEmitter<{ response: any; id: string }>();

  constructor(private api: SurveyApiService) {}

  ngOnInit() {
    this.refresh();
  }

  startEdit(index: number, item: SurveyResponse) {
    if (!item.id) {
      alert('This response cannot be edited because it has no ID.');
      return;
    }
    this.loadResponse.emit({ response: item.response, id: item.id });
  }

  deleteResponse(id: string) {
    if (!id) {
      alert('This response cannot be deleted because it has no ID.');
      return;
    }
    if (!confirm('Are you sure you want to delete this response?')) return;
    this.api.deleteResponse(id).subscribe({
      next: () => this.refresh(),
      error: err => alert('Failed to delete response: ' + (err?.error?.error || err.message || err))
    });
  }

  refresh() {
    this.api.getResponses().subscribe(data => {
      this.responses = data;
    });
  }
}
