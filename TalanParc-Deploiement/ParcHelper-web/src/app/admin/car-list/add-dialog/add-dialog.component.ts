import { Component, OnInit ,Inject} from '@angular/core';
import { FormGroup ,FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Car } from 'src/app/core/models/car';
import { CarOwnerService } from 'src/app/core/service/car-owner.service';
import { CarService } from 'src/app/core/service/car.service';
import { UserCarService } from 'src/app/core/service/usercar.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  action: string ="Ajouter";
  selectedCarForm: FormGroup;
  car: FormGroup;
  batiments : string[] =["Bloc A","Bloc B"]

  constructor(
    @Inject(MAT_DIALOG_DATA) public Data: any,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    private carService: CarService,
    private ownerService: CarOwnerService,
    private usercarService: UserCarService
  ) {}

  ngOnInit(): void {

    this.selectedCarForm = this.formBuilder.group({
      id  : [''],
      type: [''],
      matriculeFCR:[null],
      marque:[''],
      batiment:[''],
      email:[''],
      matriculeLeft:[''],
      matriculeRight:['']
    });

    if( this.editData){
      
      this.action ="Modifier";
      this.selectedCarForm.controls['batiment'].setValue(this.editData.batiment);
      this.selectedCarForm.controls['email'].setValue(this.editData.email);
      this.selectedCarForm.controls['marque'].setValue(this.editData.marque);
      //this.selectedCarForm.controls['matriculeFCR'].setValue(this.editData.matriculeFCR.substring(0, this.editData.matriculeFCR.indexOf('FCR')));
      this.selectedCarForm.controls['matriculeLeft'].setValue(this.editData.matricule.substring(0, this.editData.matricule.indexOf('TUN')));
      this.selectedCarForm.controls['matriculeRight'].setValue(this.editData.matricule.substring(this.editData.matricule.indexOf('TUN') + 3));
  
    }
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
    
    console.log("type", car["type"])
    let cardb : Car;
    if(car["type"] == "TUN"){
     cardb = {
      matricule:car["matriculeLeft"] + " TUN " + car["matriculeRight"],
      batiment: car["batiment"],
      marque: car["marque"]
    };
   }else 
   {
    cardb = {
      matricule:  car["matriculeFCR"]+ " " + car["type"],
      batiment: car["batiment"],
      marque: car["marque"]
    };
   }


    let email= car['email']
    console.log(email)

    this.carService.addCar(cardb).subscribe(res => {
    this.showNotification(
      "snackbar-success",
      " Voiture ajoutée avec succès ...!!!",
      "bottom",
      "center"
    );
    

      
    },(err)=>{
      console.log(err.error);
      this.showNotification(
        "snackbar-danger",
        " Erreur ...!!!",
        "bottom",
        "center"
      );
      
    });
  }
  
 

}
