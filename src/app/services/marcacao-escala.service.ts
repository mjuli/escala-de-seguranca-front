import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarcacaoEscala, MarcacaoEscalaOutput } from '../models/marcacao-escala';

@Injectable({
  providedIn: 'root',
})
export class MarcacaoEscalaService {
  private apiUrl = 'http://localhost:5115/api/MarcacaoEscala';

  constructor(private http: HttpClient) {}

  getMarcacaoEscalas(): Observable<MarcacaoEscalaOutput[]> {
    return this.http.get<MarcacaoEscalaOutput[]>(this.apiUrl);
  }

  getMarcacaoEscala(id: number): Observable<MarcacaoEscalaOutput> {
    return this.http.get<MarcacaoEscalaOutput>(`${this.apiUrl}/${id}`);
  }

  createMarcacaoEscala(
    marcacaoEscala: MarcacaoEscala
  ): Observable<MarcacaoEscala> {
    return this.http.post<MarcacaoEscala>(this.apiUrl, marcacaoEscala);
  }

  updateMarcacaoEscala(
    id: number,
    marcacaoEscala: MarcacaoEscala
  ): Observable<MarcacaoEscala> {
    marcacaoEscala.marcacaoEscalaId = id;
    return this.http.put<MarcacaoEscala>(
      `${this.apiUrl}/${id}`,
      marcacaoEscala
    );
  }

  deleteMarcacaoEscala(id: number): Observable<void> {
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
}
