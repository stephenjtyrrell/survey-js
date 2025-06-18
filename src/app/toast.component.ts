import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="message" class="toast" [class.toast-error]="error">
      {{ message }}
    </div>
  `,
  styles: [`
    .toast {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background: #19b394;
      color: #fff;
      padding: 1rem 2rem;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(44,62,80,0.15);
      font-size: 1.1em;
      z-index: 1000;
      transition: opacity 0.3s;
    }
    .toast-error {
      background: #e74c3c;
    }
  `]
})
export class ToastComponent {
  @Input() message: string = '';
  @Input() error: boolean = false;
}
