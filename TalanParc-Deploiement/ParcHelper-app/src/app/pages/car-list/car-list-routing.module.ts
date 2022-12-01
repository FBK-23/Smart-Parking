import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/auth/auth-guard.service';

import { CarListPage } from './car-list.page';

const routes: Routes = [
  {
    path: '',
    component: CarListPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarListPageRoutingModule {}
