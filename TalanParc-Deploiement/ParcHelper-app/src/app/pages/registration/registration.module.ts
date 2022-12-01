import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationPage } from './registration.page';
import { RegistrationPageRoutingModule } from './registration-routing.module';
import { componentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
    componentsModule,
  ],
  declarations: [
    RegistrationPage,
  ]
})
export class RegistrationPageModule {}
