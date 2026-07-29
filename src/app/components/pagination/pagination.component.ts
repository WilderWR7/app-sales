import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Link } from '../../core/models/product.model';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  @Input() meta?: Meta | null;
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  get activeCurrentPage(): number {
    return this.meta?.current_page ?? this.currentPage;
  }

  get activeTotalPages(): number {
    return this.meta?.last_page ?? this.totalPages;
  }

  get pageLinks(): Link[] {
    if (!this.meta?.links) return [];
    return this.meta.links.filter(link => {
      const label = link.label.toLowerCase();
      return !label.includes('previous') && 
             !label.includes('next') && 
             !label.includes('&laquo;') && 
             !label.includes('&raquo;');
    });
  }

  onLinkClick(link: Link): void {
    if (!link.url || link.active) return;

    try {
      const url = new URL(link.url);
      const pageParam = url.searchParams.get('page');
      if (pageParam) {
        this.pageChange.emit(Number(pageParam));
        return;
      }
    } catch {
      const pageNum = parseInt(link.label, 10);
      if (!isNaN(pageNum)) {
        this.pageChange.emit(pageNum);
      }
    }
  }

  onPageSelect(page: number): void {
    if (page >= 1 && page <= this.activeTotalPages && page !== this.activeCurrentPage) {
      this.pageChange.emit(page);
    }
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.activeTotalPages }, (_, i) => i + 1);
  }
}
