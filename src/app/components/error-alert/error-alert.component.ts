import { Component, Input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-alert.component.html',
})
export class ErrorAlert {
  @Input({ required: true }) errorMessage!: Signal<string | null>;
}
