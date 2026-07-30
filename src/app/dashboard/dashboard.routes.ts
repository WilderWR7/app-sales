import { Routes } from '@angular/router';
import { ProductPageComponent } from '../products/pages/product-page.component';
import { SalesHistoryPageComponent } from '../sales/pages/sales-history-page.component';

const DASHBOARD_ROUTES: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { 
    path: 'products', 
    component: ProductPageComponent,
  },
  {
    path: 'sales-history',
    component: SalesHistoryPageComponent,
  }
];
export default DASHBOARD_ROUTES;