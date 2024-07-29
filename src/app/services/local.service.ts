import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Local } from '../models/local';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  private apiUrl = 'http://localhost:5115/api/Local';

  constructor(private http: HttpClient) {}

  getLocais(): Observable<Local[]> {
    return this.http.get<Local[]>(this.apiUrl);
  }

  getLocal(id: number): Observable<Local> {
    return this.http.get<Local>(`${this.apiUrl}/${id}`);
  }

  createLocal(local: Local): Observable<Local> {
    return this.http.post<Local>(this.apiUrl, local);
  }

  updateLocal(id: number, local: Local): Observable<Local> {
    local.localId = id;
    return this.http.put<Local>(`${this.apiUrl}/${id}`, local);
  }

  deleteLocal(id: number): Observable<void> {
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

  getLocaisPaginados(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`${this.apiUrl}/pagination`, { params });
  }
}
