import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesService } from '../services/sales.service';
import { Sale, PaginatedSalesResponse, SalesSummary } from '../models/sale.model';
import { SalesTableHeaderComponent } from '../components/sales-table-header/sales-table-header.component';
import { SalesTableComponent } from '../components/sales-table/sales-table.component';
import { SaleDetailModalComponent } from '../components/sale-detail-modal/sale-detail-modal.component';
import { ConfirmDeleteModalComponent } from '../components/confirm-delete-modal/confirm-delete-modal.component';
import { ErrorAlert } from '../../components/error-alert/error-alert.component';

@Component({
  selector: 'app-sales-history-page',
  standalone: true,
  imports: [
    CommonModule,
    SalesTableHeaderComponent,
    SalesTableComponent,
    SaleDetailModalComponent,
    ConfirmDeleteModalComponent,
    ErrorAlert
  ],
  templateUrl: './sales-history-page.component.html'
})
export class SalesHistoryPageComponent implements OnInit {
  private salesService = inject(SalesService);

  // State Signals
  sales = signal<Sale[]>([]);
  pagination = signal<PaginatedSalesResponse | null>(null);
  summary = signal<SalesSummary | null>(null);

  isLoading = signal<boolean>(false);
  isLoadingSummary = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  currentPage = signal<number>(1);
  perPage = 10;

  // Selected for modals
  selectedSaleForDetail = signal<Sale | null>(null);
  selectedSaleForDelete = signal<Sale | null>(null);
  isDeleting = signal<boolean>(false);

  // Computed state
  totalPages = computed(() => {
    const pag = this.pagination() as any;
    if (!pag) return 1;
    return pag.last_page ?? pag.meta?.last_page ?? 1;
  });

  totalSalesCount = computed(() => {
    const pag = this.pagination() as any;
    return pag?.total ?? pag?.meta?.total ?? this.sales().length;
  });

  ngOnInit(): void {
    this.loadSales();
    this.loadSummary();
  }

  loadSales(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.salesService.getSales(this.currentPage(), this.perPage).subscribe({
      next: (response: any) => {
        const dataList = Array.isArray(response)
          ? response
          : response?.data || [];
        this.sales.set(dataList);
        this.pagination.set(Array.isArray(response) ? null : response);
        this.isLoading.set(false);
      },
      error: (err: any) => {
        this.errorMessage.set('Error al cargar el historial de ventas.');
        this.isLoading.set(false);
      }
    });
  }

  loadSummary(): void {
    this.isLoadingSummary.set(true);

    this.salesService.getSalesSummary().subscribe({
      next: (summaryData) => {
        this.summary.set(summaryData);
        this.isLoadingSummary.set(false);
      },
      error: (err) => {
        console.error('Error loading sales summary metrics', err);
        this.isLoadingSummary.set(false);
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.currentPage.set(page);
      this.loadSales();
    }
  }

  openDetailModal(sale: Sale): void {
    this.selectedSaleForDetail.set(sale);
  }

  closeDetailModal(): void {
    this.selectedSaleForDetail.set(null);
  }

  openDeleteModal(sale: Sale): void {
    this.selectedSaleForDelete.set(sale);
  }

  closeDeleteModal(): void {
    this.selectedSaleForDelete.set(null);
  }

  confirmDelete(): void {
    const sale = this.selectedSaleForDelete();
    if (!sale) return;

    this.isDeleting.set(true);
    this.errorMessage.set(null);

    this.salesService.deleteSale(sale.id).subscribe({
      next: () => {
        this.isDeleting.set(false);
        this.selectedSaleForDelete.set(null);
        this.successMessage.set(`La Venta #${sale.id} fue anulada y el stock fue restituido al inventario.`);
        this.loadSales();
        this.loadSummary();
        
        setTimeout(() => this.successMessage.set(null), 5000);
      },
      error: (err: any) => {
        this.isDeleting.set(false);
        this.errorMessage.set(err?.error?.message || `No se pudo anular la venta #${sale.id}.`);
      }
    });
  }
}
