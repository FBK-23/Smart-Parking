import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarService } from 'src/app/core/service/car.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit , AfterViewInit{

  panelOpenState = false;
  userFullName: string;
  userImg: string;
  register: FormGroup;
  loading =true;

  constructor(
    private authService: AuthService,
    private carService : CarService,
    private  _formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    
    ) {
      this.userFullName =
        this.authService.currentUserValue.firstName +
        " " +
        this.authService.currentUserValue.lastName;
    }

  
  ngOnInit() {

    

    this.register = this._formBuilder.group({
      matriculeLeftBlocked: [''],
      matriculeRightBlocked: [''],
      matricule_NTBlocked:[''],
      typeBlocked:[''],
      matriculeLeftBlock: [''],
      matriculeRightBlock: [''],
      matricule_NTBlock:[''],
      typeBlock:[''],
      
    });

  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  SearchCarOwnerNumber(data) {

    
    if(this.register.get('typeBlock').value ==="Tun"){
      const plate = this.register.get('matriculeLeftBlock').value+' TUN '+this.register.get('matriculeRightBlock').value; 
      this.carService.searchCarOwnerNumber(plate).subscribe(res => {
        this.showNotification(
          "snackbar-success",
          " Réclamation effectuée avec succès, \n \n un mail est envoyé au propriétaire ...!!!",
          "bottom",
          "center"
        );
        
             
      }, (err) => {
        this.showNotification(
          "snackbar-danger",
          " Erreur, réessayer une autre fois ...!!!",
          "bottom",
          "center"
        );
      })

    }
    else {
      const plate = this.register.get('matricule_NTBlock').value+" FCR "
      this.carService.searchCarOwnerNumber(plate).subscribe(res => {
          this.showNotification(
            "snackbar-success",
            " Réclamation effectuée avec succès ...!!!",
            "bottom",
            "center"
          );
        
      }, (err) => {
        this.showNotification(
          "snackbar-danger",
          " Erreur, réessayer une autre fois ...!!!",
          "bottom",
          "center"
        );

      })

    }
    

    
  }

  ngAfterViewInit(){


    
    setTimeout(()=>{
      this.loading = false;
    },0)
    
  }
}
