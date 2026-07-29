import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PaginatedProductsResponse } from '../../core/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/products`;

  getProducts(
    page: number = 1,
    perPage: number = 12,
    search?: string,
  ): Observable<PaginatedProductsResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.httpClient.get<PaginatedProductsResponse>(this.apiUrl, {
      params,
    });
  }
}
