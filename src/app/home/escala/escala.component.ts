import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EscalaService } from '../../services/escala.service';
import { Escala } from '../../models/escala';

@Component({
  selector: 'app-escala',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './escala.component.html',
  styleUrls: ['./escala.component.scss'],
})
export class EscalaComponent implements OnInit {
  escalas: Escala[] = [];
  escalaForm: FormGroup;
  editMode: boolean = false;
  currentEscalaId: number | null = null;

  constructor(private escalaService: EscalaService, private fb: FormBuilder) {
    this.escalaForm = this.fb.group({
      nome: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadEscalas();
  }

  loadEscalas() {
    this.escalaService.getEscalas().subscribe((data: Escala[]) => {
      this.escalas = data;
    });
  }

  onSubmit() {
    if (this.escalaForm.valid) {
      const escala: Escala = this.escalaForm.value;
      if (this.editMode && this.currentEscalaId !== null) {
        this.escalaService.updateEscala(this.currentEscalaId, escala).subscribe(() => {
          this.loadEscalas();
          this.resetForm();
        });
      } else {
        this.escalaService.createEscala(escala).subscribe(() => {
          this.loadEscalas();
          this.resetForm();
        });
      }
    }
  }

  onEdit(escala: Escala) {
    this.editMode = true;
    this.currentEscalaId = escala.escalaId;
    this.escalaForm.patchValue(escala);
  }

  onDelete(id: number) {
    this.escalaService.deleteEscala(id).subscribe(() => {
      this.loadEscalas();
    });
  }

  resetForm() {
    this.escalaForm.reset();
    this.editMode = false;
    this.currentEscalaId = null;
  }
}
