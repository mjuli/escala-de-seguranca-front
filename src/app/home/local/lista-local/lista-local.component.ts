import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Local } from '../../../models/local';
import { LocalService } from '../../../services/local.service';

@Component({
  selector: 'app-lista-local',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './lista-local.component.html',
  styleUrl: './lista-local.component.scss',
})
export class ListaLocalComponent {
  locais: Local[] = [];
  selectedLocal: Local | null = null;

  constructor(private service: LocalService) {}

  ngOnInit(): void {
    this.getLocais();
  }

  getLocais(): void {
    this.service.getLocais().subscribe((locais) => (this.locais = locais));
  }

  selectLocal(local: Local | null): void {
    this.selectedLocal = local;
  }

  saveLocal(local: Local): void {
    if (local.localId) {
      this.service
        .updateLocal(local.localId, local)
        .subscribe(() => this.getLocais());
    } else {
      this.service.createLocal(local).subscribe(() => this.getLocais());
    }
    this.selectedLocal = null;
  }

  deleteLocal(id: number): void {
    this.service.deleteLocal(id).subscribe(() => this.getLocais());
  }
}
