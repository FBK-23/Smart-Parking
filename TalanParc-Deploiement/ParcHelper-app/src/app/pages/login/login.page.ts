import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public formGroup: FormGroup;

  validation_messages = {
    'email': [
      {type: 'required', message: 'Veuillez saisir vote adresse e-mail.'},
      {type: 'pattern', message: 'Veuillez utiliser une adresse e-mail de Talan valide.'},
    ],
    'password': [
      {type: 'required', message: 'Veuillez saisir votre mot de passe.'},
    ]
  };
  
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, 
    private alertController: AlertController) {
    this.formGroup = this.formBuilder.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+\.[a-zA-Z]+(-[a-zA-Z]+)*@talan\.com$/),
        ])
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
        ])
      ]
    })
  }

  async presentAlert(subHeader: string, message: string) {
      const alert = await this.alertController.create({
        header: '',
        subHeader: subHeader,
        message: message,
        buttons: ['OK'],
      });
    
      await alert.present();
    }


  login(user: User) {
    console.log(user);
    this.userService.login(user).subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res['token']);
      this.router.navigate(['/home']);
    }, (err) => {
      console.log(err.error);
      this.presentAlert("Echec", "Veuillez vérifier votre adresse e-mail et mot de passe.")
    })
  }

  ngOnInit() {
    this.formGroup.reset();
  }

}
