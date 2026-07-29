import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, AuthResponse, LoginPayload, RegisterPayload } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private tokenKey = 'auth_token';

  readonly currentUser = signal<User | null>(null);
  readonly isAuthenticated = computed(() => !!this.currentUser());

  constructor() {
    this.initAuth();
  }

  /**
   * Initializes the session if a token exists in localStorage.
   */
  private initAuth(): void {
    const token = this.getToken();
    if (token) {
      this.getUser().subscribe({
        error: () => {
          this.clearSession();
        }
      });
    }
  }

  /**
   * Get token from localStorage
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Store token in localStorage
   */
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Start session
   */
  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${environment.apiUrl}/login`, payload).pipe(
      tap((res) => {
        const token = res.access_token;
        if (token) {
          this.setToken(token);
        }
        if (res.user) {
          this.currentUser.set(res.user);
        }
      })
    );
  }

  /**
   * Register new user
   */
  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${environment.apiUrl}/register`, payload).pipe(
      tap((res) => {
        if (res.access_token) {
          this.setToken(res.access_token);
        }
        if (res.user) {
          this.currentUser.set(res.user);
        }
      })
    );
  }

  /**
   * Get authenticated user profile
   */
  getUser(): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}/user`).pipe(
      tap((user) => {
        this.currentUser.set(user);
      })
    );
  }

  /**
   * Close session
   */
  logout(): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/logout`, {}).pipe(
      tap(() => this.clearSession()),
      catchError((err) => {
        this.clearSession();
        return of(null);
      })
    );
  }

  /**
   * Clean local authentication state
   */
  clearSession(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUser.set(null);
  }
}
