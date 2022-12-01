import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { Page500Component } from "./page500/page500.component";
import { Page404Component } from "./page404/page404.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { ResetPassWordComponent } from './reset-pass-word/reset-pass-word.component';
import { NotificationComponent } from './reset-pass-word/notification/notification.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    Page500Component,
    Page404Component,
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ActivateAccountComponent,
    ResetPassWordComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
})
export class AuthenticationModule {}
