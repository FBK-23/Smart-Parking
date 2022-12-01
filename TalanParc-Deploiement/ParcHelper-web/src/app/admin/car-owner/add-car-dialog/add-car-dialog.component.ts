import { Component, OnInit ,Inject} from '@angular/core';
import { FormGroup ,FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Owner } from 'src/app/core/models/owner';
import { CarOwnerService } from 'src/app/core/service/car-owner.service';


@Component({
  selector: 'app-add-car-dialog',
  templateUrl: './add-car-dialog.component.html',
  styleUrls: ['./add-car-dialog.component.css']
})
export class AddCarDialogComponent implements OnInit {

  action: string ="Ajouter";
  selectedCarForm: FormGroup;
  car: FormGroup;
  batiments : string[] =["Bloc A","Bloc B"]

  constructor(
    @Inject(MAT_DIALOG_DATA) public Data: any,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private carownerservice :CarOwnerService,
    public dialogRef: MatDialogRef<AddCarDialogComponent>
  ) { }

  ngOnInit(): void {

    this.selectedCarForm = this._formBuilder.group({
      email      : [''],
      telephone: [''],
      batiment      : [''],
      firstName:[''],
      lastName:['']
    });

    if( this.editData){
      this.action ="Modifier";
      this.selectedCarForm.controls['email'].setValue(this.editData.email);
      this.selectedCarForm.controls['telephone'].setValue(this.editData.telephone);
      this.selectedCarForm.controls['batiment'].setValue(this.editData.batiment);
      this.selectedCarForm.controls['firstName'].setValue(this.editData.firstName);
      this.selectedCarForm.controls['lastName'].setValue(this.editData.lastName);
  
    }
  }
  closeDiag(){
    this.dialogRef.close();
    setTimeout(()=>{
      window.location.reload();
    }, 1500);
  }
  
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  actionFunction(){
    if(this.action==='Ajouter'){
      const data = this.selectedCarForm.getRawValue();
      this.addOwner(data);
    }
    else if(this.action==='Modifier'){
      console.log('id :',this.editData._id)
      this.updateOwner(this.editData._id,this.selectedCarForm.value);
    }

  }
  addOwner(user){
  
    let userdb : Owner;
    userdb = {
      lastName:user["lastName"],
      firstName: user["firstName"],
      telephone: user["telephone"],
      batiment:user["batiment"],
      email: user["email"]

      
    };
   
   console.log(user)

    this.carownerservice.addOwner(userdb).subscribe(res => {
    this.showNotification(
      "snackbar-success",
      " Conducteur ajouté avec succès ...!!!",
      "bottom",
      "center"
    );
    this.dialogRef.close();
    

      
    },(err)=>{
      console.log(err.error);
      this.showNotification(
        "snackbar-danger",
        " Erreur ...!!!",
        "bottom",
        "center"
      );
      
    });
    this.dialogRef.close();
     
  }

  updateOwner(id,user){
  
    let userdb : Owner;
    userdb = {
      lastName:user["lastName"],
      firstName: user["firstName"],
      telephone: user["telephone"],
      batiment:user["batiment"],
      email: user["email"]

      
    };
   
   console.log("les changements :",user)

    this.carownerservice.updateOwner(id,userdb).subscribe(res => {
    this.showNotification(
      "snackbar-success",
      " Donnée modifiée avec succès ...!!!",
      "bottom",
      "center"
    );
    this.dialogRef.close();

      
    },(err)=>{
      console.log(err.error);
      this.showNotification(
        "snackbar-danger",
        " Erreur ...!!!",
        "bottom",
        "center"
      );
      
    });
    
    this.dialogRef.close();
  }
  
    

}
