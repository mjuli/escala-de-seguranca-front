import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LocalService } from '../../../services/local.service';
import { Local } from '../../../models/local';

@Component({
  selector: 'app-form-local',
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
  templateUrl: './form-local.component.html',
  styleUrls: ['./form-local.component.scss'],
})
export class FormLocalComponent implements OnInit {
  localForm: FormGroup;
  editMode: boolean = false;
  currentLocalId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private localService: LocalService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.localForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentLocalId = +params['id'];
        this.loadLocal(this.currentLocalId);
      }
    });
  }

  loadLocal(id: number) {
    this.localService.getLocal(id).subscribe((local) => {
      this.localForm.patchValue(local);
    });
  }

  onSubmit() {
    if (this.localForm.valid) {
      const local: Local = this.localForm.value;
      if (this.editMode && this.currentLocalId !== null) {
        this.localService
          .updateLocal(this.currentLocalId, local)
          .subscribe(() => {
            this.router.navigate(['/home/local']);
            this.snackBar.open('Local Atualizado com sucesso!', 'Fechar', {
              duration: 3000,
            });
          });
      } else {
        this.localService.createLocal(local).subscribe(() => {
          this.router.navigate(['/home/local']);
          this.snackBar.open('Local criado com sucesso!', 'Fechar', {
            duration: 3000,
          });
        });
      }
    }
  }

  onDelete() {
    if (this.currentLocalId !== null) {
      this.localService.deleteLocal(this.currentLocalId).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  activateEditMode() {
    this.editMode = true;
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  resetForm() {
    this.localForm.reset();
    this.editMode = false;
    this.currentLocalId = null;
  }

  onLogout() {
    console.log('Logout clicked');
    this.router.navigate(['/login']);
  }
}
