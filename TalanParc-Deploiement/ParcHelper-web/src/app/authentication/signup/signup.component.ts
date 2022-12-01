import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarOwnerService } from 'src/app/core/service/car-owner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUp: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;
  chide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private carOwnerservice: CarOwnerService,
    private router: Router
  ) {}
  ngOnInit() {
    this.signUp = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      telephone: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
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
  
  onSubmit(formValue) {
    this.carOwnerservice.addUser(formValue).subscribe(
      res =>{
        this.showNotification(
          "snackbar-success",
          " Ajout effectué avec succès !  \n\r Vérifier votre boite mail pour activer votre compte !",
          "bottom",
          "center"
        );
        this.router.navigateByUrl('/authentication/signin');
    },(err)=>{
      this.showNotification(
              "snackbar-success",
              " Echec , réessayer encore une fois ...!!!",
              "bottom",
              "center"
            );
    })
   
  }
}
