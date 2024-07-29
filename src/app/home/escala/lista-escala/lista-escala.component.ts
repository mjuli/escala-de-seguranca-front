import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { Escala } from '../../../models/escala';
import { EscalaService } from '../../../services/escala.service';
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
import { Observable } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { DialogDeleteComponent } from '../../dialog/dialog-delete/dialog-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista-escala',
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
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
  ],
  templateUrl: './lista-escala.component.html',
  styleUrls: ['./lista-escala.component.scss'],
})
export class ListaEscalaComponent implements AfterViewInit {
  escalas$: Observable<Escala[]>;
  dataSource = new MatTableDataSource<Escala>();
  displayedColumns = ['escalaId', 'dataHoraEntrada', 'dataHoraSaida', 'acao'];
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private escalaService: EscalaService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.escalas$ = this.loadEscalas();
    this.updateList();
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  loadEscalas() {
    return this.escalaService.getEscalas();
  }

  updateList() {
    this.escalas$ = this.escalaService.getEscalas();
    this.escalas$.subscribe((escalas) => {
      this.dataSource.data = escalas;
      this.dataSource.paginator = this.paginator;
    });
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
        this.escalaService.deleteEscala(id).subscribe({
          next: () => {
            this.updateList();
            this.snackBar.open('Escala excluída com sucesso', 'Fechar', {
              duration: 3000,
            });
          },
          error: (e) => {
            console.error(e.error);
            this.snackBar.open(
              'Não foi possível excluir escala. Motivo: ' +
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

  onLogout() {
    console.log('Logout clicked');
    this.router.navigate(['/login']);
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
