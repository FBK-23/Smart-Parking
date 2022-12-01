import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { CarService } from 'src/app/core/service/car.service';
import { CarOwnerService } from 'src/app/core/service/car-owner.service';
import { Car } from 'src/app/core/models/car';
import { UserCarService } from 'src/app/core/service/usercar.service';

export interface PeriodicElement {
  matricule: string;
  marque: string;
  batiment: string;
  phone: string;
  AllName: string,
  
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit , AfterViewInit {

  displayedColumns: string[] = ['AllName','phone', 'matricule', 'marque','actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataa: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private carService: CarService,
  ) 
  { 
    this.carService.getAll().subscribe(
      res =>{
        this.dataa = res;
        this.dataSource = new MatTableDataSource(this.dataa);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },)

  }

  
  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  DialogAdd(){
    this.matDialog.open(AddDialogComponent);
  }

  editCar(row: any){
    this.matDialog.open(AddDialogComponent,{data: row});
  }

  deleteCar(id : string){
    this.carService.delete(id).subscribe(() => {
      this.showNotification(
         "snackbar-danger",
         " Suppresion effectuée avec succès ...!!!",
         "bottom",
         "center"
      ), (err) => {
        this.showNotification(
          "snackbar-danger",
          " Erreur, réessayer une autre fois ...!!!",
          "bottom",
          "center"
        );
      }
    });
    setTimeout(()=>{
      window.location.reload();
    }, 1500);
    

  }
  



}
