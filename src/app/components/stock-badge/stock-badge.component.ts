import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-badge.component.html'
})
export class StockBadgeComponent {
  @Input({ required: true }) stock: number = 0;
}
