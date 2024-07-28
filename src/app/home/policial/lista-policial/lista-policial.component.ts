import { Component, OnInit } from '@angular/core';
import { Policial } from '../../../models/policial';
import { PolicialService } from '../../../services/policial.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-policial',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './lista-policial.component.html',
  styleUrls: ['./lista-policial.component.scss'],
})
export class ListaPolicialComponent implements OnInit {
  policiais: Policial[] = [];
  policialForm: FormGroup;
  editMode: boolean = false;
  currentPolicialId: number | null = null;

  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;

  constructor(private policialService: PolicialService, private fb: FormBuilder, private router: Router) {
    this.policialForm = this.fb.group({
      cpf: ['', Validators.required],
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadPoliciais();
  }

  loadPoliciais() {
    this.policialService.getPoliciaisPaginados(this.currentPage, this.pageSize).subscribe((response) => {
      this.policiais = response.data;
      this.totalItems = response.totalCount;
      this.totalPages = response.totalPages;
    });
  }

  onSubmit() {
    if (this.policialForm.valid) {
      const policial: Policial = this.policialForm.value;
      if (this.editMode && this.currentPolicialId !== null) {
        this.policialService.updatePolicial(this.currentPolicialId, policial).subscribe(() => {
          this.loadPoliciais();
          this.resetForm();
        });
      } else {
        this.policialService.createPolicial(policial).subscribe(() => {
          this.loadPoliciais();
          this.resetForm();
        });
      }
    }
  }

  onEdit(policial: Policial) {
    this.editMode = true;
    this.currentPolicialId = policial.policialId;
    this.policialForm.patchValue(policial);
  }

  onDelete(id: number) {
    this.policialService.deletePolicial(id).subscribe(() => {
      this.loadPoliciais();
    });
  }

  resetForm() {
    this.policialForm.reset();
    this.editMode = false;
    this.currentPolicialId = null;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPoliciais();
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  onLogout() {
    console.log('Logout clicked');
    this.router.navigate(['/login']);
  }
}
