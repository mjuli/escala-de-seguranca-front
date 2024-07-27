import { Component } from '@angular/core';
import { MarcacaoEscala } from '../../models/marcacao-escala';
import { MarcacaoEscalaService } from '../../services/marcacao-escala.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-marcacao-escala',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './marcacao-escala.component.html',
  styleUrl: './marcacao-escala.component.scss',
})
export class MarcacaoEscalaComponent {
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
