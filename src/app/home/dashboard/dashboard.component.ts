import { Component, OnInit } from '@angular/core';
import { MarcacaoEscala } from '../../models/marcacao-escala';
import { MarcacaoEscalaService } from '../../services/marcacao-escala.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  marcacoesEscala: MarcacaoEscala[] = [];

  constructor(private service: MarcacaoEscalaService, private router: Router) {}

  ngOnInit(): void {
    this.service.getMarcacaoEscalas().subscribe({
      next: (data: MarcacaoEscala[]) => (this.marcacoesEscala = data),
      error: (e) => console.log(e),
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
