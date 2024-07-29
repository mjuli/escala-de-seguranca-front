import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import {
  RouterOutlet,
  RouterLink,
  Router,
  RouterLinkActive,
  ActivatedRoute,
} from '@angular/router';
import { MarcacaoEscalaService } from '../../../services/marcacao-escala.service';
import { MarcacaoEscala } from '../../../models/marcacao-escala';
import { Policial } from '../../../models/policial';
import { Escala } from '../../../models/escala';
import { Local } from '../../../models/local';
import { MatSelectModule } from '@angular/material/select';
import { PolicialService } from '../../../services/policial.service';
import { LocalService } from '../../../services/local.service';
import { EscalaService } from '../../../services/escala.service';

@Component({
  selector: 'app-form-marcacao-escala',
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
    MatSelectModule,
  ],
  templateUrl: './form-marcacao-escala.component.html',
  styleUrl: './form-marcacao-escala.component.scss',
})
export class FormMarcacaoEscalaComponent implements OnInit {
  marcacaoForm: FormGroup;
  editMode: boolean = false;
  currentMarcacaoId: number | null = null;
  policiais: Policial[] = [];
  escalas: Escala[] = [];
  locais: Local[] = [];

  constructor(
    private fb: FormBuilder,
    private service: MarcacaoEscalaService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private policialService: PolicialService,
    private localService: LocalService,
    private escalaService: EscalaService
  ) {
    this.marcacaoForm = this.fb.group({
      policialId: ['', Validators.required],
      escalaId: ['', Validators.required],
      localId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentMarcacaoId = +params['id'];
        this.loadMarcacao(this.currentMarcacaoId);
      }
    });

    this.loadDados();
  }

  loadDados() {
    this.policialService.getPoliciais().subscribe((data) => {
      this.policiais = data;
    });
    this.escalaService.getEscalas().subscribe((data) => {
      this.escalas = data;
    });
    this.localService.getLocais().subscribe((data) => {
      this.locais = data;
    });
  }

  loadMarcacao(id: number) {
    this.service.getMarcacaoEscala(id).subscribe((marcacao) => {
      this.marcacaoForm.patchValue(marcacao);
    });
  }

  onSubmit() {
    console.log(this.marcacaoForm.valid);
    if (this.marcacaoForm.valid) {
      const marcacao: MarcacaoEscala = this.marcacaoForm.value;
      if (this.editMode && this.currentMarcacaoId !== null) {
        console.log(marcacao);
        this.service
          .updateMarcacaoEscala(this.currentMarcacaoId, marcacao)
          .subscribe({
            next: () => {
              this.snackBar.open('Marcação atualizado com sucesso!', 'Fechar', {
                duration: 3000,
              });
            },
            error: (e) => {
              console.error(e.error);
              this.snackBar.open(
                'Não foi possível atualizar marcação. Motivo: ' +
                  e.error.toLowerCase(),
                'Fechar',
                {
                  duration: 3000,
                }
              );
            },
          });
      } else {
        this.service.createMarcacaoEscala(marcacao).subscribe({
          next: () => {
            this.snackBar.open('Marcação cadastrada com sucesso!', 'Fechar', {
              duration: 3000,
            });
          },
          error: (e) => {
            console.error(e.error);
            this.snackBar.open(
              'Não foi possível cadastrar marcação. Motivo: ' +
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

  goBack() {
    this.router.navigate(['/home/marcacao-escala']);
  }

  resetForm() {
    this.marcacaoForm.reset();
    this.editMode = false;
    this.currentMarcacaoId = null;
  }

  onLogout() {
    console.log('Logout clicked');
    this.router.navigate(['/login']);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
