import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { Local } from '../../../models/local';
import { LocalService } from '../../../services/local.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DialogDeleteComponent } from '../../dialog/dialog-delete/dialog-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista-local',
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
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './lista-local.component.html',
  styleUrls: ['./lista-local.component.scss'],
})
export class ListaLocalComponent implements AfterViewInit {
  locais$: Observable<Local[]>;
  dataSource = new MatTableDataSource<Local>();
  displayedColumns = ['localId', 'nome', 'descricao', 'acao'];
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private localService: LocalService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.locais$ = this.loadLocais();
    this.updateList();
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  updateList() {
    this.locais$ = this.localService.getLocais();
    this.locais$.subscribe((locais) => {
      this.dataSource.data = locais;
      this.dataSource.paginator = this.paginator;
    });
  }

  loadLocais() {
    return this.localService.getLocais();
  }

  onEdit(id: Number) {
    this.router.navigate([`${id}/edit`], {
      relativeTo: this.activatedRoute,
    });
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(DialogDeleteComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.localService.deleteLocal(id).subscribe({
          next: () => {
            this.updateList();
            this.snackBar.open('Local excluído com sucesso', 'Fechar', {
              duration: 3000,
            });
          },
          error: (e) => {
            console.error(e.error);
            this.snackBar.open(
              'Não foi possível excluir local. Motivo: ' +
                e.error.toLowerCase(),
              'Fechar',
              {
                duration: 3000,
              }
            );
          },
        });
        this.updateList();
      }
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
    localStorage.removeItem('jwt-token');
    this.router.navigate(['/login']);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }
}
