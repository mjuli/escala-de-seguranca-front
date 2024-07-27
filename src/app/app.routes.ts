import { Routes } from '@angular/router';

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
        loadComponent: () =>
          import('./home/escala/escala.component').then(
            (m) => m.EscalaComponent
          ),
      },
      {
        path: 'local',
        loadComponent: () =>
          import('./home/local/local.component').then((m) => m.LocalComponent),
      },
      {
        path: 'marcacao-escala',
        loadComponent: () =>
          import('./home/marcacao-escala/marcacao-escala.component').then(
            (m) => m.MarcacaoEscalaComponent
          ),
      },
      {
        path: 'policial',
        loadComponent: () =>
          import('./home/policial/policial.component').then(
            (m) => m.PolicialComponent
          ),
      },
    ],
  },
];
