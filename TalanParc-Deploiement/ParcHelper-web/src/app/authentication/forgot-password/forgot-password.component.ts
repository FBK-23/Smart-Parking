import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarOwnerService } from 'src/app/core/service/car-owner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  authForm: FormGroup;
  submitted = false;
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private carownerService: CarOwnerService,
    private router: Router
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  forgotPassword(form) {
    console.log('email',form.email);
    const mail = form.email;
    this.carownerService.sendMailForgetPass(mail).subscribe(res => {
      this.showNotification(
        "snackbar-success",
        "Succès ! Veuillez vérifier votre boite mail",
        "bottom",
        "center"
      );
      this.router.navigateByUrl('/authentication/signin');
    }, (err) => {
      console.log(err.error);
      this.showNotification(
        "snackbar-danger",
        "Echec, veuillez vérifier votre adresse e-mail",
        "bottom",
        "center"
      );
      
  });
  }
}
