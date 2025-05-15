import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kunde } from '../shared/models/kunde.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:3000/api/kunden';

  constructor(private http: HttpClient) {}

  /** Alle Kunden laden */
  getKunden(): Observable<Kunde[]> {
    return this.http.get<Kunde[]>(this.baseUrl);
  }

  /** Neuen Kunden anlegen */
  addKunde(k: { name: string; email: string }): Observable<Kunde> {
    return this.http.post<Kunde>(this.baseUrl, k);
  }

  /** Kunden aktualisieren */
  updateKunde(k: Kunde): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${k.id}`, k);
  }

  /** Kunden löschen */
  deleteKunde(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
