import { DashboardComponent as patientDashboard } from './../../patient/dashboard/dashboard.component';
import { Page404Component } from './../../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
const routes: Routes = [
  
 
  {
    path: 'dashboard2',
    component: Dashboard2Component,
  },
  
  
  { path: '**', component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
