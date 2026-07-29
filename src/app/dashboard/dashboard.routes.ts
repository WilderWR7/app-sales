import { Routes } from '@angular/router';
import { ProductPageComponent } from '../products/pages/product-page.component';

const DASHBOARD_ROUTES: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { 
    path: 'products', 
    component: ProductPageComponent,
  }
];
export default DASHBOARD_ROUTES;