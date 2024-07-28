import { Component, OnInit } from '@angular/core';
import { MarcacaoEscala } from '../../models/marcacao-escala';
import { MarcacaoEscalaService } from '../../services/marcacao-escala.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatCardModule, MatIconModule],
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
  onLogout() {
    console.log('Logout clicked');
    this.router.navigate(['/login']);
  }
}
