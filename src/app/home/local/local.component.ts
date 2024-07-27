import { Component } from '@angular/core';
import { Local } from '../../models/local';
import { LocalService } from '../../services/local.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-local',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './local.component.html',
  styleUrl: './local.component.scss',
})
export class LocalComponent {
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
