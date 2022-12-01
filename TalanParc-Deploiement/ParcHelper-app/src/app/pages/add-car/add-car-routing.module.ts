import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/auth/auth-guard.service';

import { AddCarPage } from './add-car.page';

const routes: Routes = [
  {
    path: '',
    component: AddCarPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCarPageRoutingModule {}
