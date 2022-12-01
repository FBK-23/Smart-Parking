import { Component, OnInit } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { CameraService } from '../../services/camera.service';
import { AuthService } from '../../auth/auth.service';
import { SMS } from '@ionic-native/sms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  ocrService = "notExecuting";

  constructor(private cameraService: CameraService, private router: Router,private alertController: AlertController) { }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: '',
      subHeader: subHeader,
      message: message,
      buttons: [
        {
          text: 'OK'
          
        },    
      ],
    });

    await alert.present();
  }



  sendSMS(phoneNumber: string, message: string){
    var options = {
      replaceLineBreaks: false,
      android: {
        intent: 'INTENT' 
      }
    }
    SMS.send(phoneNumber, message, options);
  }


  async capturePhoto() {
    this.ocrService = "executing";
    try {
      let result = await this.cameraService.capturePhoto();
      result.subscribe(data => {
        let alertMessage = "Bonjour " + data[0].Owner.firstName +  " " + data[0].Owner.lastName +
          ",\n Votre voiture bloque la mienne, merci de bien vouloir la déplacer."
        this.sendSMS(data[0].Owner.telephone, alertMessage);
        this.ocrService = "notExecuting";
      }, (err) => {
          this.presentAlert("Pas d'information !", "Cette voiture n'est pas enregistrée dans le système <br> Prière de vérifier avec l'agent de stationnement, merci ")
          console.log(err);
          this.ocrService =  "notExecuting";
      });
    } catch (error) {
      this.ocrService = "notExecuting";
    }
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['login']);
  }

  ngOnInit() {
  }

}
