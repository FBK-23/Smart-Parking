import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { PasswordCustomValidator } from 'src/app/customValidators/passwordCustomValidator';
import { PasswordReset } from 'src/app/models/PasswordReset';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  public formGroup: FormGroup;
  
  validation_messages = {
    'oldPassword': [
      {type: 'required', message: 'Veuillez saisir votre ancien mot de passe.'},
    ],

    'password': [
      {type: 'required', message: 'Veuillez saisir votre nouveau mot de passe.'},
      {type: 'pattern', message: 'Votre mot de passe doit avoir au moins \
        une lettre majuscule, une lettre minuscule, un chiffre, et entre 8 et 30 caractères.'},
    ],
    
    'confirmPassword': [
      {type: 'required', message: 'Veuillez ressaisir votre nouveau mot de passe.'},
      {type: 'noPasswordMatch', message: 'Les mots de passe ne sont pas identiques.'},
    ],

  };

  constructor(private userService: UserService, private formBuilder: FormBuilder,
    private alertController: AlertController, private router: Router) {
      this.formGroup = this.formBuilder.group({
        oldPassword: [
          null,
          Validators.compose([
            Validators.required,
          ])
        ],

        password: [
          null,
          Validators.compose([
            Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\.\,\;\:A-Za-z\dàâäéèêëìîïòôöùûü@$!'"()=+*%#?&^_-]{8,30}$/),  
          ])
        ],
  
        confirmPassword: [
          null,
          Validators.compose([
            Validators.required,
          ])
        ],
      },
      {
        validator: PasswordCustomValidator.passwordMatchValidator 
      } as AbstractControlOptions);
      
    }

  ngOnInit() {
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  resetPassword(passwordReset: PasswordReset){
    this.userService.resetPassword(passwordReset).subscribe(res => {
      this.presentAlert("Succès", "Votre mot de passe a été modifié.");
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log(err.error);
      this.presentAlert("Echec", "Veuillez vérifier votre ancien mot de passe.");
    });
  }

}
