import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'admin-page',
    component: AdminPageComponent
  }
];
