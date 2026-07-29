import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-user-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dropdown.component.html'
})
export class UserDropdownComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  isOpen = false;

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  logout(): void {
    this.isOpen = false;
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.router.navigate(['/login'])
    });
  }
}
