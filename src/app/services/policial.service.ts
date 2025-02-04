import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Policial } from '../models/policial';

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
    return this.http.post<Policial>(this.apiUrl, policial, {
      responseType: 'text' as 'json',
    });
  }

  updatePolicial(id: number, policial: Policial): Observable<Policial> {
    policial.policialId = id;
    return this.http.put<Policial>(`${this.apiUrl}/${id}`, policial, {
      responseType: 'text' as 'json',
    });
  }

  deletePolicial(id: number): Observable<void> {
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

  getPoliciaisPaginados(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`${this.apiUrl}/pagination`, { params });
  }
}
