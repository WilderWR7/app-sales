import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SalePayload, CreateSaleResponse, PaginatedSalesResponse, SalesSummary } from '../models/sale.model';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private httpClient = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/sales`;

  /**
   * Create new Sale
   */
  createSale(payload: SalePayload): Observable<CreateSaleResponse> {
    return this.httpClient.post<CreateSaleResponse>(this.apiUrl, payload);
  }

  /**
   * Get all sales with pagination
   */
  getSales(page: number = 1, perPage: number = 10): Observable<PaginatedSalesResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    return this.httpClient.get<PaginatedSalesResponse>(this.apiUrl, { params });
  }

  /**
   * Get sales summary metrics & KPIs
   */
  getSalesSummary(): Observable<SalesSummary> {
    return this.httpClient.get<SalesSummary>(`${this.apiUrl}/summary`);
  }

  /**
   * Delete a sale
   */
  deleteSale(saleId: number): Observable<{ message: string }> {
    return this.httpClient.delete<{ message: string }>(`${this.apiUrl}/${saleId}`);
  }
}
