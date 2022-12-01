import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchCarPageRoutingModule } from './search-car-routing.module';

import { SearchCarPage } from './search-car.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SearchCarPageRoutingModule
  ],
  declarations: [SearchCarPage]
})
export class SearchCarPageModule {}
