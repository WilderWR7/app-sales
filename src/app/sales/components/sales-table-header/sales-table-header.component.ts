import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-table-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-table-header.component.html'
})
export class SalesTableHeaderComponent {
  @Input() totalSales: number = 0;
}
