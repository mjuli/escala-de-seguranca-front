import { Component, OnInit } from '@angular/core';
import { Local } from '../../../models/local';
import { LocalService } from '../../../services/local.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-local',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './lista-local.component.html',
  styleUrls: ['./lista-local.component.scss'],
})
export class ListaLocalComponent implements OnInit {
  locais: Local[] = [];
  localForm: FormGroup;
  editMode: boolean = false;
  currentLocalId: number | null = null;

  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;

  constructor(private localService: LocalService, private fb: FormBuilder, private router: Router) {
    this.localForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadLocais();
  }

  loadLocais() {
    this.localService.getLocaisPaginados(this.currentPage, this.pageSize).subscribe((response) => {
      this.locais = response.data;
      this.totalItems = response.totalCount;
      this.totalPages = response.totalPages;
    });
  }

  onSubmit() {
    if (this.localForm.valid) {
      const local: Local = this.localForm.value;
      if (this.editMode && this.currentLocalId !== null) {
        this.localService.updateLocal(this.currentLocalId, local).subscribe(() => {
          this.loadLocais();
          this.resetForm();
        });
      } else {
        this.localService.createLocal(local).subscribe(() => {
          this.loadLocais();
          this.resetForm();
        });
      }
    }
  }

  onEdit(local: Local) {
    this.editMode = true;
    this.currentLocalId = local.localId;
    this.localForm.patchValue(local);
  }

  onDelete(id: number) {
    this.localService.deleteLocal(id).subscribe(() => {
      this.loadLocais();
    });
  }

  resetForm() {
    this.localForm.reset();
    this.editMode = false;
    this.currentLocalId = null;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadLocais();
  }

  goHome() {
    this.router.navigate(['/home']);
  }
  onLogout() {
    console.log('Logout clicked');
    this.router.navigate(['/login']);
  }
}
