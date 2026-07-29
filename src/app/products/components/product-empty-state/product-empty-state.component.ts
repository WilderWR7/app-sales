import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';

@Component({
  selector: 'product-empty-state',
  standalone: true,
  imports: [],
  templateUrl: './product-empty-state.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEmptyStateComponent {
  @Input() errorMessage = signal<string | null>(null);
}
