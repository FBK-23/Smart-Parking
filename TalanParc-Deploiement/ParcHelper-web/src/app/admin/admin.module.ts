import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ChartsModule as chartjsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AdminRoutingModule } from './admin-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CarListComponent } from './car-list/car-list.component';
import { CarOwnerComponent } from './car-owner/car-owner.component';
import { AddCarDialogComponent } from './car-owner/add-car-dialog/add-car-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { AddDialogComponent } from './car-list/add-dialog/add-dialog.component';
import { Dashboard2Component } from './dashboard/dashboard2/dashboard2.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [ CarListComponent, CarOwnerComponent, AddCarDialogComponent, AddDialogComponent , Dashboard2Component
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    FormsModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    chartjsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class AdminModule {}
