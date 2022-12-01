import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {


  public formGroup: FormGroup;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private router: Router
    ) {
      this.formGroup = this.formBuilder.group({
        email: [''],

      })
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

  forgotPassword(form) {
    console.log('email',form.email);
    const mail = form.email;
    this.userService.sendMailForgetPass(mail).subscribe(res => {
      this.presentAlert("Succès", "Veuillez vérifier votre boite mail");
      this.router.navigateByUrl('/login');
    }, (err) => {
      console.log(err.error);
      this.presentAlert("Echec", "Veuillez vérifier votre adresse e-mail");
    });
  }

}
