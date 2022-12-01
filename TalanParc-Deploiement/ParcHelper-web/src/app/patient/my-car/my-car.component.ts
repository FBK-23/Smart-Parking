import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatDialog} from '@angular/material/dialog';
import { AddCarComponent } from './add-car/add-car.component';
import { MatSnackBar } from "@angular/material/snack-bar";
import { CarOwnerService } from 'src/app/core/service/car-owner.service';
import { CarService } from 'src/app/core/service/car.service';

export interface PeriodicElement {
  matricule: string;
  batiment: string;
  marque: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-my-car',
  templateUrl: './my-car.component.html',
  styleUrls: ['./my-car.component.css']
})

export class MyCarComponent implements OnInit , AfterViewInit{

  displayedColumns: string[] = ['marque', 'matricule', 'batiment','actions'];
  data2Source = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataa: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(

    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private carService: CarService,
    private ownerService: CarOwnerService,
  
    ) 
  { 
    this.ownerService.getCarsByUser().subscribe(
      res =>{
        this.dataa = res;
        this.data2Source = new MatTableDataSource(this.dataa);
        this.data2Source.paginator = this.paginator;
        this.data2Source.sort = this.sort;
      },)
    
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.data2Source.paginator = this.paginator;
    this.data2Source.sort = this.sort;
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data2Source.filter = filterValue.trim().toLowerCase();


    if (this.data2Source.paginator) {
      this.data2Source.paginator.firstPage();
    }
  }
  DialogAdd(){
    this.matDialog.open(AddCarComponent);

  }
  editCar(row: any){
    this.matDialog.open(AddCarComponent,{data: row});
  }
  deleteCar(id){
    this.carService.deleteCar(id).subscribe(res => {
      this.showNotification(
        "snackbar-danger",
        " Suppresion effectuée avec succès ...!!!",
        "bottom",
        "center"
      );
    }, 
    (err) => {
      this.showNotification(
              "snackbar-danger",
              " Erreur, essayer encore une fois ...!!!",
              "bottom",
              "center"
            );
    
    });
    setTimeout(()=>{
      window.location.reload();
    }, 1500);
  }
  

}
