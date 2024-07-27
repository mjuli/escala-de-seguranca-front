import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Escala } from '../models/escala';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EscalaService {
  private apiUrl = 'http://localhost:5115/api/Escala';

  constructor(private http: HttpClient) {}

  getEscalas(): Observable<Escala[]> {
    return this.http.get<Escala[]>(this.apiUrl);
  }

  getEscala(id: number): Observable<Escala> {
    return this.http.get<Escala>(`${this.apiUrl}/${id}`);
  }

  createEscala(escala: Escala): Observable<Escala> {
    return this.http.post<Escala>(this.apiUrl, escala);
  }

  updateEscala(id: number, escala: Escala): Observable<Escala> {
    return this.http.put<Escala>(`${this.apiUrl}/${id}`, escala);
  }

  deleteEscala(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
