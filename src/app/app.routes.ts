import { Routes } from '@angular/router';
import { appAuthGuard } from './app-auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./auth/login/login.component').then((m) => m.LoginComponent),
      },
    ],
  },
  {
    path: 'home',
    canActivate: [appAuthGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'escala',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./home/escala/lista-escala/lista-escala.component').then(
                (m) => m.ListaEscalaComponent
              ),
          },
          {
            path: 'new',
            loadComponent: () =>
              import('./home/escala/form-escala/form-escala.component').then(
                (m) => m.FormEscalaComponent
              ),
          },
          {
            path: ':id/edit',
            loadComponent: () =>
              import('./home/escala/form-escala/form-escala.component').then(
                (m) => m.FormEscalaComponent
              ),
          },
        ],
      },
      {
        path: 'local',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./home/local/lista-local/lista-local.component').then(
                (m) => m.ListaLocalComponent
              ),
          },
          {
            path: 'new',
            loadComponent: () =>
              import('./home/local/form-local/form-local.component').then(
                (m) => m.FormLocalComponent
              ),
          },
          {
            path: ':id/edit',
            loadComponent: () =>
              import('./home/local/form-local/form-local.component').then(
                (m) => m.FormLocalComponent
              ),
          },
        ],
      },
      {
        path: 'marcacao-escala',
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './home/marcacao-escala/lista-marcacao-escala/lista-marcacao-escala.component'
              ).then((m) => m.ListaMarcacaoEscalaComponent),
          },
          {
            path: 'new',
            loadComponent: () =>
              import(
                './home/marcacao-escala/form-marcacao-escala/form-marcacao-escala.component'
              ).then((m) => m.FormMarcacaoEscalaComponent),
          },
          {
            path: ':id/edit',
            loadComponent: () =>
              import(
                './home/marcacao-escala/form-marcacao-escala/form-marcacao-escala.component'
              ).then((m) => m.FormMarcacaoEscalaComponent),
          },
        ],
      },
      {
        path: 'policial',
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './home/policial/lista-policial/lista-policial.component'
              ).then((m) => m.ListaPolicialComponent),
          },
          {
            path: 'new',
            loadComponent: () =>
              import(
                './home/policial/form-policial/form-policial.component'
              ).then((m) => m.FormPolicialComponent),
          },
          {
            path: ':id/edit',
            loadComponent: () =>
              import(
                './home/policial/form-policial/form-policial.component'
              ).then((m) => m.FormPolicialComponent),
          },
        ],
      },
    ],
  },
];
