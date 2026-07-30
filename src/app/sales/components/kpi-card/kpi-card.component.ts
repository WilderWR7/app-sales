import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-card.component.html'
})
export class KpiCardComponent {
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() subtitle: string = '';
  @Input() isLoading: boolean = false;
  @Input() iconColorClass: string = 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40';
  @Input() hoverBorderClass: string = 'hover:border-red-500/50';
  @Input() valueColorClass: string = 'text-gray-900 dark:text-white';
}
