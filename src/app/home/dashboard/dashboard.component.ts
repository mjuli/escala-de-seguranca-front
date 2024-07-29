import { Component, OnInit } from '@angular/core';
import { MarcacaoEscala } from '../../models/marcacao-escala';
import { MarcacaoEscalaService } from '../../services/marcacao-escala.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Section {
  title: string;
  newRoute: string;
  listRoute: string;
  newLabel: string;
  listLabel: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  marcacoesEscala: MarcacaoEscala[] = [];
  currentDate: string;
  currentTime: string;

  sections: Section[] = [
    {
      title: 'Marcação de Escala',
      newRoute: '/home/marcacao-escala/new',
      listRoute: '/home/marcacao-escala',
      newLabel: 'Cadastrar Nova Marcação',
      listLabel: 'Listar Marcações Cadastradas',
    },
    {
      title: 'Policial',
      newRoute: '/home/policial/new',
      listRoute: '/home/policial',
      newLabel: 'Cadastrar Novo Policial',
      listLabel: 'Listar Policiais Cadastrados',
    },
    {
      title: 'Local',
      newRoute: '/home/local/new',
      listRoute: '/home/local',
      newLabel: 'Cadastrar Novo Local',
      listLabel: 'Listar Locais Cadastrados',
    },
    {
      title: 'Escala',
      newRoute: '/home/escala/new',
      listRoute: '/home/escala',
      newLabel: 'Cadastrar Nova Escala',
      listLabel: 'Listar Escalas',
    }
  ];

  selectedSection: Section | null = null;

  constructor(private service: MarcacaoEscalaService, private router: Router) {
    const now = new Date();
    this.currentDate = now.toLocaleDateString('pt-BR');
    this.currentTime = now.toLocaleTimeString('pt-BR');
  }

  ngOnInit(): void {
    this.service.getMarcacaoEscalas().subscribe({
      next: (data: MarcacaoEscala[]) => (this.marcacoesEscala = data),
      error: (e) => console.log(e),
    });
  }

  selectSection(section: Section) {
    this.selectedSection = section;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  onLogout() {
    localStorage.removeItem('jwt-token');
    this.router.navigate(['/login']);
  }
}
