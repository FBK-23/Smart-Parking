import { Component, OnInit, ContentChild } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { AlertController, IonInput } from '@ionic/angular';
import { PasswordCustomValidator } from 'src/app/customValidators/passwordCustomValidator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  public formGroup: FormGroup;

  @ContentChild(IonInput) input: IonInput;

  showPassword: Boolean = false;

  validation_messages = {
    'firstName': [
      {type: 'required', message: 'Veuillez saisir votre nom.'},
    ],
    'lastName': [
      {type: 'required', message: 'Veuillez saisir votre prénom.'},
    ],
    'email': [
      {type: 'required', message: 'Veuillez saisir vote adresse e-mail.'},
      {type: 'pattern', message: 'Veuillez utiliser une adresse e-mail de Talan valide.'},
    ],
    'telephone': [
      {type: 'required', message: 'Veuillez saisir votre numéro de téléphone.'},
      {type: 'pattern', message: 'Veuillez saisir un numéro de téléphone valide'},
    ],
    'password': [
      {type: 'required', message: 'Veuillez saisir votre mot de passe.'},
      {type: 'pattern', message: 'Votre mot de passe doit avoir au moins \
        une lettre majuscule, une lettre minuscule, un chiffre, et entre 8 et 30 caractères.'},
    ],
    'confirmPassword': [
      {type: 'required', message: 'Veuillez ressaisir votre mot de passe.'},
      {type: 'noPasswordMatch', message: 'Les mots de passe ne sont pas identiques.'},
    ]
  };


  constructor(private formBuilder: FormBuilder, private userService: UserService, 
    private router: Router, private alertController: AlertController) {
    this.formGroup = this.formBuilder.group({
      firstName: [
        null, 
        Validators.compose([
          Validators.required,
        ])
      ],
      
      lastName: [
        null, 
        Validators.compose([
          Validators.required,
        ])
      ],
      
      email: [
        null, 
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+\.[a-zA-Z]+(-[a-zA-Z]+)*@talan\.com$/),
        ])
      ],
      
      telephone: [
        null, 
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]{8}$/),
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

  showHide() {
    this.showPassword = !this.showPassword;
    this.input.type = this.showPassword ? 'text' : 'password';
  }
  
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }



  submitForm(user: User){
    console.log(user);
    this.userService.add(user).subscribe(res => {
      this.presentAlert("Succès", "Votre compte a été ajouté \n Vérifier votre boite mail !");
      this.formGroup.reset();
      this.router.navigateByUrl('/login');
      
    }, (err) => {
      console.log(err.error);
      this.presentAlert("Echec", "Nous ne pouvons pas ajouter ce compte. Veuillez vérifier votre \
      addresse e-mail ou contactez votre administrateur.");
    });
  }


  ngOnInit() {
    this.formGroup.reset();
  }

}
