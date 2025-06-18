import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-responses',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  template: `
    <h2>Survey Responses</h2>
    <table *ngIf="responses.length; else noData">
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Response</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of responses; let i = index">
          <td>{{ i + 1 }}</td>
          <td>{{ item.date }}</td>
          <td><pre>{{ item.response | json }}</pre></td>
          <td><button (click)="startEdit(i, item)">Edit</button></td>
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
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(44,62,80,0.08);
      padding: 1.5rem;
      font-family: var(--sjs-font-family, Arial, sans-serif);
    }
    table { border-collapse: collapse; width: 100%; margin-top: 1rem; }
    th, td { border: 1px solid #e4e4e4; padding: 8px; text-align: left; }
    th { background: #f8f8f8; color: #2c3e50; }
    tr:nth-child(even) { background: #fafbfc; }
    h2 { color: #2c3e50; }
    button { background: #19b394; color: #fff; border: none; border-radius: 4px; padding: 6px 14px; cursor: pointer; }
    button:hover { background: #179d82; }
  `]
})
export class ResponsesComponent implements OnInit {
  responses: any[] = [];
  @Output() loadResponse = new EventEmitter<{ response: any; id: string }>();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.refresh();
  }

  startEdit(index: number, item: any) {
    if (!item.id) {
      alert('This response cannot be edited because it has no ID.');
      return;
    }
    this.loadResponse.emit({ response: item.response, id: item.id });
  }

  refresh() {
    this.http.get<any[]>('http://localhost:3001/api/response').subscribe(data => {
      this.responses = data;
    });
  }
}
