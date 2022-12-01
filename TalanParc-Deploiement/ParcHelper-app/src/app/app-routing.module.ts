import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { AutoLoginGuardService } from './auth/auto-login-guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canLoad: [AutoLoginGuardService]
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then( m => m.RegistrationPageModule),
    canLoad: [AutoLoginGuardService]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule),
    canLoad: [AutoLoginGuardService]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuardService]

  },
  {
    path: 'search-car',
    loadChildren: () => import('./pages/search-car/search-car.module').then( m => m.SearchCarPageModule),
    canLoad: [AuthGuardService]

  },
  {
    path: 'car-list',
    loadChildren: () => import('./pages/car-list/car-list.module').then( m => m.CarListPageModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'add-car',
    loadChildren: () => import('./pages/add-car/add-car.module').then( m => m.AddCarPageModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule),
    canLoad: [AuthGuardService]
  },
  { path: '**', redirectTo: '/login' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
