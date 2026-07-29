import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'product-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-header.component.html',
})
export class ProductHeaderComponent {
  @Input({ required: true }) totalItems: number = 0;
  @Input({ required: true }) searchControl!: FormControl;
}
