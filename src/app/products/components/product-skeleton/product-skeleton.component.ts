import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'product-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-skeleton.component.html',
})
export class ProductSkeletonComponent {
  @Input() isLoading: boolean = false;
}
