import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, AuthResponse, LoginPayload, RegisterPayload } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';

  readonly currentUser = signal<User | null>(null);
  readonly isAuthenticated = computed(() => !!this.currentUser() || !!this.getToken());

  constructor() {
    this.initAuth();
  }

  /**
   * Synchronously restores the session from localStorage on page reload.
   * 
   */
  private initAuth(): void {
    const token = this.getToken();
    const savedUser = localStorage.getItem(this.userKey);

    if (savedUser) {
      try {
        this.currentUser.set(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error parsing stored user data', e);
      }
    }

    if (token) {
      // Re-validates user
      this.getUser().subscribe({
        error: (err) => {
          if (err?.status === 401) {
            this.clearSession();
          }
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
  private setSession(token: string, user?: User): void {
    localStorage.setItem(this.tokenKey, token);
    if (user) {
      localStorage.setItem(this.userKey, JSON.stringify(user));
      this.currentUser.set(user);
    }
  }

  /**
   * Start session
   */
  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${environment.apiUrl}/login`, payload).pipe(
      tap((res) => {
        if (res.access_token) {
          this.setSession(res.access_token, res.user);
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
          this.setSession(res.access_token, res.user);
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
        localStorage.setItem(this.userKey, JSON.stringify(user));
      })
    );
  }

  /**
   * Close session
   */
  logout(): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/logout`, {}).pipe(
      tap(() => this.clearSession()),
      catchError(() => {
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
    localStorage.removeItem(this.userKey);
    this.currentUser.set(null);
  }
}
