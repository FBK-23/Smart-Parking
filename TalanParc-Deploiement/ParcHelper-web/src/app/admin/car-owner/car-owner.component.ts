import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { AddCarDialogComponent } from './add-car-dialog/add-car-dialog.component';
import { CarService } from 'src/app/core/service/car.service';

export interface PeriodicElement {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  adresse: string;
 // batiment: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-car-owner',
  templateUrl: './car-owner.component.html',
  styleUrls: ['./car-owner.component.css']
})
export class CarOwnerComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['AllName', 'email', 'phone','actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataa: any;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  router: any;

  constructor(
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private carService: CarService 
  ) 
  {
    this.carService.getOwner().subscribe(
      res =>{
        this.dataa = res;
        this.dataSource = new MatTableDataSource(this.dataa);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 
  )
  }
 

  ngOnInit(): void {
   
  } 
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  DialogAdd(){
    this.matDialog.open(AddCarDialogComponent);
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
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editOwner(row: any){
    
    this.matDialog.open(AddCarDialogComponent,{data: row});
  }
  deleteOwner(id : string){
    this.carService.deleteUser(id).subscribe(() => {
      this.showNotification(
        "snackbar-danger",
        " Suppresion de propriétaire effectuée avec succès ! ",
        "bottom",
        "center"
      )
      , (err) => {
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
    }, 1200);
  }

}
