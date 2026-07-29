import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  templateUrl: './dashboard-layout.component.html',
  imports: [NavbarComponent, RouterModule],
})
export class DashboardLayoutComponent {}
