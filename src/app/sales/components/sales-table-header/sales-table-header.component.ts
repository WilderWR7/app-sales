import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesSummary } from '../../models/sale.model';
import { KpiCardComponent } from '../kpi-card/kpi-card.component';

@Component({
  selector: 'app-sales-table-header',
  standalone: true,
  imports: [CommonModule, KpiCardComponent],
  templateUrl: './sales-table-header.component.html'
})
export class SalesTableHeaderComponent {
  @Input() totalSales: number = 0;
  @Input() summary: SalesSummary | null = null;
  @Input() isLoadingSummary: boolean = false;
}
