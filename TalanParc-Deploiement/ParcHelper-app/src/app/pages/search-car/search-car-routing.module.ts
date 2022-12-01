import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/auth/auth-guard.service';
import { SearchCarPage } from './search-car.page';

const routes: Routes = [
  {
    path: '',
    component: SearchCarPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class SearchCarPageRoutingModule {}
