import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NonAuthGuard } from './guards/non-auth/non-auth.guard';
import { AuthGuard } from './guards/auth/auth.guard';


const routes: Routes = [
  { path: '', canActivate: [AuthGuard], loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'login', canActivate: [NonAuthGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
