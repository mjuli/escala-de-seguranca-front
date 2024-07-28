import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { EscalaService } from '../../../services/escala.service';
import { Escala } from '../../../models/escala';

@Component({
  selector: 'app-form-escala',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './form-escala.component.html',
  styleUrls: ['./form-escala.component.scss']
})
export class FormEscalaComponent {
  escalaForm: FormGroup;
  editMode: boolean = false;
  currentEscalaId: number | null = null;

  constructor(private fb: FormBuilder, private escalaService: EscalaService, private router: Router) {
    this.escalaForm = this.fb.group({
      nome: ['', Validators.required],
      dataEntrada: ['', Validators.required],
      dataSaida: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.escalaForm.valid) {
      const escala: Escala = this.escalaForm.value;
      if (this.editMode && this.currentEscalaId !== null) {
        this.escalaService.updateEscala(this.currentEscalaId, escala).subscribe(() => {
          this.resetForm();
        });
      } else {
        this.escalaService.createEscala(escala).subscribe(() => {
          this.resetForm();
        });
      }
    }
  }

  activateEditMode() {
    this.editMode = true;
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  resetForm() {
    this.escalaForm.reset();
    this.editMode = false;
    this.currentEscalaId = null;
  }
}
