import { Component, OnInit ,Inject} from '@angular/core';
import { FormGroup ,FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Car } from 'src/app/core/models/car';
import { CarOwnerService } from 'src/app/core/service/car-owner.service';
import { CarService } from 'src/app/core/service/car.service';
import { UserCarService } from 'src/app/core/service/usercar.service';
import { CarOwner,CarParam} from '../my-car.model'

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  action: string ="Ajouter";
  selectedCarForm: FormGroup;
  car: FormGroup;
  batiments : string[] =["Bloc A","Bloc B"]

  
  constructor(
    @Inject(MAT_DIALOG_DATA) public Data: any,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private _formBuilder: FormBuilder,
    private carservice : CarService,
    private usercarservice : UserCarService,
    private carownerservice : CarOwnerService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddCarComponent>
  ) 
  { 

  }

  ngOnInit(): void {

    this.selectedCarForm = this._formBuilder.group({
      id  : [''],
      type:[''],
      batiment      : [''],
      matriculeLeft: [''],
      matriculeRight: [''],
      matriculeRS:[''],
      marque:['']
    });



  }
  

  closeDiag(){
    this.dialogRef.close();
  }
  
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  
  addCar(car){
    
    let cardb:Car;
    if(car['type']==='TUN'){
       cardb = {
       matricule:car["matriculeLeft"] + " TUN " +car["matriculeRight"],
       batiment: car["batiment"],
       marque: car["marque"]
      };
    }
    else if(car['type']==='FCR'){
      cardb = {
      matricule:car["matriculeRS"] + " FCR" ,
      batiment: car["batiment"],
      marque: car["marque"]
     };
   }
  
   this.carservice.addCar(cardb).subscribe(res => {
    this.showNotification(
         "snackbar-success",
         " Ajout effectué avec succès ...!!!",
         "bottom",
         "center"
       );
  
    },(err)=>{
      console.log(err.error);
      this.showNotification(
              "snackbar-danger",
              " Voiture déja existante ou les champs sont mal remplis !",
              "bottom",
              "center"
            );
    });
    setTimeout(()=>{
      window.location.reload();
    }, 1500);
  }
}
