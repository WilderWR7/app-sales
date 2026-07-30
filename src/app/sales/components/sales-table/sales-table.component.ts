import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sale } from '../../models/sale.model';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { Meta } from 'src/app/core/models/paginate.model';

@Component({
  selector: 'app-sales-table',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './sales-table.component.html'
})
export class SalesTableComponent {
  @Input() sales: Sale[] = [];
  @Input() meta: Meta | null | undefined = null;
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() isLoading: boolean = false;

  @Output() viewDetail = new EventEmitter<Sale>();
  @Output() requestDelete = new EventEmitter<Sale>();
  @Output() pageChange = new EventEmitter<number>();

  onView(sale: Sale): void {
    this.viewDetail.emit(sale);
  }

  onDelete(sale: Sale): void {
    this.requestDelete.emit(sale);
  }

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }
}
