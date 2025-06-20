import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SurveyConfigService {
  private configUpdatedSource = new Subject<void>();
  configUpdated$ = this.configUpdatedSource.asObservable();

  notifyConfigUpdated() {
    this.configUpdatedSource.next();
  }
}
