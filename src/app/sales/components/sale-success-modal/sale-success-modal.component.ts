import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSaleResponse } from '../../models/sale.model';

@Component({
  selector: 'app-sale-success-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sale-success-modal.component.html'
})
export class SaleSuccessModalComponent {
  @Input() response: CreateSaleResponse | null = null;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
