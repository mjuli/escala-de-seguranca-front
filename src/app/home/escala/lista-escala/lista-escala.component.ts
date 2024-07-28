import { Component, OnInit } from '@angular/core';
import { Escala } from '../../../models/escala';
import { EscalaService } from '../../../services/escala.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-escala',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './lista-escala.component.html',
  styleUrls: ['./lista-escala.component.scss'],
})
export class ListaEscalaComponent implements OnInit {
  escalas: Escala[] = [];
  escalaForm: FormGroup;
  editMode: boolean = false;
  currentEscalaId: number | null = null;

  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;

  constructor(private escalaService: EscalaService, private fb: FormBuilder, private router: Router) {
    this.escalaForm = this.fb.group({
      nome: ['', Validators.required],
      dataEntrada: ['', Validators.required],
      dataSaida: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadEscalas();
  }

  loadEscalas() {
    this.escalaService.getEscalasPaginadas(this.currentPage, this.pageSize).subscribe((response) => {
      this.escalas = response.data;
      this.totalItems = response.totalCount;
      this.totalPages = response.totalPages;
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

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadEscalas();
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
