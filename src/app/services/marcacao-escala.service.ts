import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarcacaoEscala } from '../models/marcacao-escala';

@Injectable({
  providedIn: 'root',
})
export class MarcacaoEscalaService {
  private apiUrl = 'http://localhost:5115/api/MarcacaoEscala';

  constructor(private http: HttpClient) {}

  getMarcacaoEscalas(): Observable<MarcacaoEscala[]> {
    return this.http.get<MarcacaoEscala[]>(this.apiUrl);
  }

  getMarcacaoEscala(id: number): Observable<MarcacaoEscala> {
    return this.http.get<MarcacaoEscala>(`${this.apiUrl}/${id}`);
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
    return this.http.put<MarcacaoEscala>(
      `${this.apiUrl}/${id}`,
      marcacaoEscala
    );
  }

  deleteMarcacaoEscala(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
