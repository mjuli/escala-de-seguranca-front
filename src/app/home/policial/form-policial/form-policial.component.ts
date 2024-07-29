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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  Router,
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { PolicialService } from '../../../services/policial.service';
import { Policial } from '../../../models/policial';

@Component({
  selector: 'app-form-policial',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './form-policial.component.html',
  styleUrls: ['./form-policial.component.scss'],
})
export class FormPolicialComponent implements OnInit {
  policialForm: FormGroup;
  editMode: boolean = false;
  currentPolicialId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private policialService: PolicialService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.policialForm = this.fb.group({
      cpf: ['', Validators.required],
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentPolicialId = +params['id'];
        this.loadPolicial(this.currentPolicialId);
      }
    });
  }

  loadPolicial(id: number) {
    this.policialService.getPolicial(id).subscribe((policial) => {
      this.policialForm.patchValue(policial);
    });
  }

  onSubmit() {
    if (this.policialForm.valid) {
      const policial: Policial = this.policialForm.value;
      if (this.editMode && this.currentPolicialId !== null) {
        this.policialService
          .updatePolicial(this.currentPolicialId, policial)
          .subscribe({
            next: () => {
              this.snackBar.open('Policial atualizado com sucesso!', 'Fechar', {
                duration: 3000,
              });
              this.router.navigate(['/home/policial']);
            },
            error: (e) => {
              console.error(e.error);
              this.snackBar.open(
                'Não foi possível atualizar o policial. Motivo: ' +
                  e.error.toLowerCase(),
                'Fechar',
                {
                  duration: 3000,
                }
              );
              this.router.navigate(['/home/policial']);
            },
          });
      } else {
        this.policialService.createPolicial(policial).subscribe({
          next: () => {
            this.snackBar.open('Policial cadastrado com sucesso!', 'Fechar', {
              duration: 3000,
            });
            this.router.navigate(['/home/policial']);
          },
          error: (e) => {
            console.error(e.error);
            this.snackBar.open(
              'Não foi possível cadastrar policial. Motivo: ' +
                e.error.toLowerCase(),
              'Fechar',
              {
                duration: 3000,
              }
            );
            this.router.navigate(['/home/policial']);
          },
        });
      }
    }
  }

  onDelete() {
    if (this.currentPolicialId !== null) {
      this.policialService
        .deletePolicial(this.currentPolicialId)
        .subscribe(() => {
          this.router.navigate(['/home/policial']);
        });
    }
  }

  goBack() {
    this.router.navigate(['/home/policial']);
  }

  resetForm() {
    this.policialForm.reset();
    this.editMode = false;
    this.currentPolicialId = null;
  }
  onLogout() {
    console.log('Logout clicked');
    this.router.navigate(['/login']);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
