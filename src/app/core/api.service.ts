import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kunde } from '../shared/models/kunde.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'http://localhost:3000/api/kunden';

  constructor(private http: HttpClient) {}

  getKunden(): Observable<Kunde[]> {
    return this.http.get<Kunde[]>(this.base);
  }

  addKunde(k: Omit<Kunde, 'id'>): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.base, k);
  }

  updateKunde(k: Kunde): Observable<any> {
    return this.http.put(`${this.base}/${k.id}`, k);
  }

  deleteKunde(id: number): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
