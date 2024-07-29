import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { EscalaService } from '../../../services/escala.service';
import { Escala } from '../../../models/escala';

@Component({
  selector: 'app-form-escala',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './form-escala.component.html',
  styleUrls: ['./form-escala.component.scss'],
})
export class FormEscalaComponent implements OnInit {
  escalaForm: FormGroup;
  editMode: boolean = false;
  currentEscalaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private escalaService: EscalaService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.escalaForm = this.fb.group({
      dataHoraEntrada: ['', Validators.required],
      dataHoraSaida: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentEscalaId = +params['id'];
        this.loadEscala(this.currentEscalaId);
      }
    });
  }

  loadEscala(id: number) {
    this.escalaService.getEscala(id).subscribe((escala) => {
      escala.dataHoraEntrada = new Date(escala.dataHoraEntrada)
        .toISOString()
        .slice(0, -1);
      escala.dataHoraSaida = new Date(escala.dataHoraSaida)
        .toISOString()
        .slice(0, -1);
      this.escalaForm.patchValue(escala);
    });
  }

  onSubmit() {
    if (this.escalaForm.valid) {
      const escala: Escala = this.escalaForm.value;
      escala.dataHoraEntrada = new Date(escala.dataHoraEntrada).toISOString();
      escala.dataHoraSaida = new Date(escala.dataHoraSaida).toISOString();
      if (this.editMode && this.currentEscalaId !== null) {
        this.escalaService
          .updateEscala(this.currentEscalaId, escala)
          .subscribe({
            next: () => {
              this.snackBar.open('Escala atualizada com sucesso!', 'Fechar', {
                duration: 3000,
              });
              this.router.navigate(['/home/escala']);
            },
            error: (e) => {
              console.error(e.error);
              this.snackBar.open(
                'Não foi possível atualizar escala. Motivo: ' +
                  e.error.toLowerCase(),
                'Fechar',
                {
                  duration: 3000,
                }
              );
              this.router.navigate(['/home/escala']);
            },
          });
      } else {
        this.escalaService.createEscala(escala).subscribe({
          next: () => {
            this.snackBar.open('Escala cadastrada com sucesso!', 'Fechar', {
              duration: 3000,
            });
            this.router.navigate(['/home/escala']);
          },
          error: (e) => {
            console.error(e.error);
            this.snackBar.open(
              'Não foi possível cadastrar escala. Motivo: ' +
                e.error.toLowerCase(),
              'Fechar',
              {
                duration: 3000,
              }
            );
          },
        });
      }
    }
  }

  onLogout() {
    localStorage.removeItem('jwt-token');
    this.router.navigate(['/login']);
  }
  onDelete() {
    if (this.currentEscalaId !== null) {
      this.escalaService.deleteEscala(this.currentEscalaId).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }
  activateEditMode() {
    this.editMode = true;
  }

  goBack() {
    this.router.navigate(['/home/escala']);
  }

  resetForm() {
    this.escalaForm.reset();
    this.editMode = false;
    this.currentEscalaId = null;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
