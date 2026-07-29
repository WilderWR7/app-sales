import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/product.model';
import { StockBadgeComponent } from '../../../components/stock-badge/stock-badge.component';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [CommonModule, StockBadgeComponent],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
}
