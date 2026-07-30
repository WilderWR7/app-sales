import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sale } from '../../models/sale.model';

@Component({
  selector: 'app-sale-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sale-detail-modal.component.html'
})
export class SaleDetailModalComponent {
  @Input() sale: Sale | null = null;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  get items() {
    return this.sale?.details || [];
  }
}
