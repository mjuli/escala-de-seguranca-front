import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Policial } from '../models/policial';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PolicialService {
  private apiUrl = 'http://localhost:5115/api/Policial';

  constructor(private http: HttpClient) {}

  getPoliciais(): Observable<Policial[]> {
    return this.http.get<Policial[]>(this.apiUrl);
  }

  getPolicial(id: number): Observable<Policial> {
    return this.http.get<Policial>(`${this.apiUrl}/${id}`);
  }

  createPolicial(policial: Policial): Observable<Policial> {
    return this.http.post<Policial>(this.apiUrl, policial);
  }

  updatePolicial(id: number, policial: Policial): Observable<Policial> {
    return this.http.put<Policial>(`${this.apiUrl}/${id}`, policial);
  }

  deletePolicial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
