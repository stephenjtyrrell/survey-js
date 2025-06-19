import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SurveyResponse } from './survey-response.model';

@Injectable({ providedIn: 'root' })
export class SurveyApiService {
  private readonly apiUrl = '/api/response';

  constructor(private http: HttpClient) {}

  getResponses(): Observable<SurveyResponse[]> {
    return this.http.get<SurveyResponse[]>(this.apiUrl);
  }

  addResponse(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateResponse(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteResponse(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
