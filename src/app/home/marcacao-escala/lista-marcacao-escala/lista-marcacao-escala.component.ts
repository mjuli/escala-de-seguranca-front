import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MarcacaoEscalaOutput } from '../../../models/marcacao-escala';
import { MarcacaoEscalaService } from '../../../services/marcacao-escala.service';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginatorModule,
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { DialogDeleteComponent } from '../../dialog/dialog-delete/dialog-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista-marcacao-escala',
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
  templateUrl: './lista-marcacao-escala.component.html',
  styleUrl: './lista-marcacao-escala.component.scss',
})
export class ListaMarcacaoEscalaComponent implements AfterViewInit {
  marcacoes$: Observable<MarcacaoEscalaOutput[]>;
  dataSource = new MatTableDataSource<MarcacaoEscalaOutput>();
  displayedColumns = [
    'marcacaoEscalaId',
    'policialNome',
    'dataHoraEntrada',
    'dataHoraSaida',
    'localNome',
    'acao',
  ];
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private marcacaoService: MarcacaoEscalaService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.marcacoes$ = this.loadMarcacoes();
    this.updateList();
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  updateList() {
    this.marcacoes$ = this.marcacaoService.getMarcacaoEscalas();
    this.marcacoes$.subscribe((marcacoes) => {
      this.dataSource.data = marcacoes;
      this.dataSource.paginator = this.paginator;
    });
  }

  loadMarcacoes() {
    return this.marcacaoService.getMarcacaoEscalas();
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
        this.marcacaoService.deleteMarcacaoEscala(id).subscribe({
          next: () => {
            this.updateList();
            this.snackBar.open('Marcação excluída com sucesso', 'Fechar', {
              duration: 3000,
            });
          },
          error: (e) => {
            console.error(e.error);
            this.snackBar.open(
              'Não foi possível excluir marcação. Motivo: ' +
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

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }
}
