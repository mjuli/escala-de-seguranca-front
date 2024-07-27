import { Component } from '@angular/core';
import { Escala } from '../../models/escala';
import { ActivatedRoute } from '@angular/router';
import { EscalaService } from '../../services/escala.service';

@Component({
  selector: 'app-escala',
  standalone: true,
  imports: [],
  templateUrl: './escala.component.html',
  styleUrl: './escala.component.scss',
})
export class EscalaComponent {
  escalas: any;

  escalaId: number | null = null;
  escala: Escala | null = null;

  constructor(private route: ActivatedRoute, private service: EscalaService) {}

  ngOnInit(): void {
    // Obtemos o id da rota
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.escalaId = +id;
        this.getEscala(this.escalaId);
      }
    });
  }

  getEscala(id: number): void {
    this.service.getEscala(id).subscribe({
      next: (data: Escala) => (this.escala = data),
      error: (e) => console.error('Erro ao obter a escala', e),
    });
  }

  excluirEscala(arg0: any) {
    throw new Error('Method not implemented.');
  }
  editarEscala(arg0: any) {
    throw new Error('Method not implemented.');
  }
  adicionarEscala() {
    throw new Error('Method not implemented.');
  }
}
