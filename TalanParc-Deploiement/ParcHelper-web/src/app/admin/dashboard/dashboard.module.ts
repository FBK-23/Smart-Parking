import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { ChartsModule as chartjsModule } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatTableModule } from '@angular/material/table' ;

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    chartjsModule,
    MatTableModule,
    NgApexchartsModule,
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
  ],
})
export class DashboardModule {}
