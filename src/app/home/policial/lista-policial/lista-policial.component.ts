import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Policial } from '../../../models/policial';
import { PolicialService } from '../../../services/policial.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-lista-policial',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './lista-policial.component.html',
  styleUrls: ['./lista-policial.component.scss'],
})
export class ListaPolicialComponent implements AfterViewInit {
  policiais$: Observable<Policial[]>;
  dataSource = new MatTableDataSource<Policial>();
  displayedColumns = ['policialId', 'nome', 'cpf', 'telefone', 'acao'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private policialService: PolicialService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private activatedRoute: ActivatedRoute
  ) {
    this.policiais$ = this.loadPoliciais();
    this.updateList();
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  updateList() {
    this.policiais$ = this.policialService.getPoliciais();
    this.policiais$.subscribe((policiais) => {
      this.dataSource.data = policiais;
      this.dataSource.paginator = this.paginator;
    });
  }

  loadPoliciais() {
    return this.policialService.getPoliciais();
  }

  onEdit(id: Number) {
    this.router.navigate([`${id}/edit`], {
      relativeTo: this.activatedRoute,
    });
  }

  onDelete(id: number) {
    this.policialService.deletePolicial(id).subscribe(() => {
      this.loadPoliciais();
    });
  }

  onPageChange(event: PageEvent) {
    this.dataSource.paginator = this.paginator;
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

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
