import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarcacaoEscala } from '../../../models/marcacao-escala';
import { MarcacaoEscalaService } from '../../../services/marcacao-escala.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-lista-marcacao-escala',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './lista-marcacao-escala.component.html',
  styleUrl: './lista-marcacao-escala.component.scss',
})
export class ListaMarcacaoEscalaComponent {
  marcacoes: MarcacaoEscala[] = [];
  selectedMarcacao: MarcacaoEscala | null = null;

  constructor(private service: MarcacaoEscalaService) {}

  ngOnInit(): void {
    this.getMarcacoes();
  }

  getMarcacoes(): void {
    this.service
      .getMarcacaoEscalas()
      .subscribe((marcacoes) => (this.marcacoes = marcacoes));
  }

  selectMarcacao(marcacao: MarcacaoEscala): void {
    this.selectedMarcacao = marcacao;
  }

  saveMarcacao(marcacao: MarcacaoEscala): void {
    if (marcacao.marcacaoEscalaId) {
      this.service
        .updateMarcacaoEscala(marcacao.marcacaoEscalaId, marcacao)
        .subscribe(() => this.getMarcacoes());
    } else {
      this.service
        .createMarcacaoEscala(marcacao)
        .subscribe(() => this.getMarcacoes());
    }
    this.selectedMarcacao = null;
  }

  deleteMarcacao(id: number): void {
    this.service.deleteMarcacaoEscala(id).subscribe(() => this.getMarcacoes());
  }
}
