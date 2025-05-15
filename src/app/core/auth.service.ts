import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private registerUrl = 'http://localhost:3000/api/register';
  private loginUrl = 'http://localhost:3000/api/login';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  /** Führt Login durch und speichert das JWT im localStorage */
  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<{ token: string }>(this.loginUrl, { username, password })
      .pipe(
        tap(res => localStorage.setItem(this.tokenKey, res.token)),
        map(() => true)
      );
  }

  /** Registriert einen neuen Benutzer */
register(username: string, password: string): Observable<{ id: number }> {
  return this.http.post<{ id: number }>(this.registerUrl, { username, password });
}

  /** Löscht das Token (Logout) */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /** Prüft, ob ein Token vorhanden ist */
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  /** Liefert das gespeicherte Token zurück */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
