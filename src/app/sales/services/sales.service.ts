import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SalePayload, CreateSaleResponse } from '../models/sale.model';

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
}
