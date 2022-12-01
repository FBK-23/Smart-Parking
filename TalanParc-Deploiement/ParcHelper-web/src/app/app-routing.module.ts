import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './authentication/page404/page404.component';
import { Page500Component } from './authentication/page500/page500.component';
import { AuthGuard } from './core/guard/auth.guard';
import { Role } from './core/models/role';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    
    children: [
      { path: '', redirectTo: '/authentication/signin', pathMatch: 'full' },
      {
        path: 'admin',
        canActivate: [AuthGuard],
        data:{roles: Role.Admin},
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
     
      {
        path: 'patient',
        canActivate: [AuthGuard],
        data:{roles: Role.User},
        loadChildren: () =>
          import('./patient/patient.module').then((m) => m.PatientModule),
      },
      
      
    ],
  },
  
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: '**', component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
