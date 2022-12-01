import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexLegend,
  ApexFill,
} from 'ng-apexcharts';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { CarService } from 'src/app/core/service/car.service';

export interface PeriodicElement {
  car1: string;
  car2: string;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {car1: '78 TUN 895', car2: '129 TUN 785', date: 'Lundi 18 OCT 10:52:55'},
  {car1: '55 TUN 5482', car2: '66 TUN 785', date: 'Jeudi 07 OCT 08:08:55'},
  {car1: '136 TUN 5836', car2: '16 TUN 785', date: 'Samedi 01 OCT 17:52:55'},
  {car1: '78 TUN 895', car2: '2 TUN 785', date: 'Lundi 18 OCT 10:52:55'},
  {car1: '11 TUN 8796', car2: '129 TUN 785', date: 'Lundi 18 OCT 10:52:55'},
  {car1: '230 TUN 1236', car2: '129 TUN 785', date: 'Lundi 18 OCT 10:52:55'},
  {car1: '47 TUN 8954', car2: '129 TUN 785', date: 'Lundi 18 OCT 10:52:55'},
  
];

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.css'],
})
export class Dashboard2Component implements OnInit {
  
  CountTotal: number = 0;

  constructor(
    private carService: CarService,
  ) {
    
  }
  

  /** Selects all rows if they are not all selected; otherwise clear selection. */

  displayedColumns: string[] = ['car1', 'car2', 'date'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.carService.getAllCars().subscribe(
      res =>{
        console.log('Nombre de voitures total', Object.keys(res).length)
        this.CountTotal= Object.keys(res).length
      },)
  }

  
}
