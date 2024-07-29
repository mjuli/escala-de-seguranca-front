import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Escala } from '../models/escala';

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
    return this.http.post<Escala>(this.apiUrl, escala, {
      responseType: 'text' as 'json',
    });
  }

  updateEscala(id: number, escala: Escala): Observable<Escala> {
    escala.escalaId = id;
    return this.http.put<Escala>(`${this.apiUrl}/${id}`, escala, {
      responseType: 'text' as 'json',
    });
  }

  deleteEscala(id: number): Observable<void> {
    const body = [
      {
        path: '/inativado',
        op: 'replace',
        value: true,
      },
    ];

    return this.http.patch<any>(`${this.apiUrl}/${id}/UpdatePartial`, body, {
      responseType: 'text' as 'json',
    });
  }

  getEscalasPaginadas(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`${this.apiUrl}/pagination`, { params });
  }
}
