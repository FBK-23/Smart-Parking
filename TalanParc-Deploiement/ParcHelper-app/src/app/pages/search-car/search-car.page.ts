import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SMS } from '@ionic-native/sms';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.page.html',
  styleUrls: ['./search-car.page.scss'],
})
export class SearchCarPage implements OnInit {
  public formGroup: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router,
     private alertController: AlertController) {
    this.formGroup = this.formBuilder.group({
      type: [],
      matriculeRS: [],
      plateNumber1: [],
      plateNumber2: []
    })
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

  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };

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


  ngOnInit() {
  }


  SearchCarOwnerNumber() {

    if(this.formGroup.get('type').value ==='TUN'){
      const plate = this.formGroup.get('plateNumber1').value+" TUN "+this.formGroup.get('plateNumber2').value 
      console.log('num', plate)
      this.userService.searchCarOwnerNumber(plate).subscribe(res => {
        var firstName = res[0].Owner.firstName;
        var lastName = res[0].Owner.lastName;
        var telephone = res[0].Owner.telephone;
        let alertMessage= "Bonjour " + firstName +  " " + lastName + 
        ",\n Votre voiture bloque la mienne, merci de bien vouloir la déplacer.";
          this.sendSMS(telephone, alertMessage);   
      }, (err) => {
        this.presentAlert("Pas d'information !", "La voiture : "+ plate + " <br/> n'est pas enregistrée dans le système <br> Prière de vérifier avec l'agent de stationnement, merci ")
        console.log(err);
      })

    }
    else {
      const plate = this.formGroup.get('matriculeRS').value+" FCR "
      console.log('num',plate)
      this.userService.searchCarOwnerNumber(plate).subscribe(res => {
        var firstName = res[0].Owner.firstName;
        var lastName = res[0].Owner.lastName;
        var telephone = res[0].Owner.telephone;
        //this.presentAlert("Propriétaire du voiture", "La voiture : "+ plate + " <br/> Propriétaire : " 
          //+ firstName + lastName + " <br/> Téléphone : "+ telephone )
        
        let alertMessage = "Bonjour " + firstName +  " " + lastName + 
          ",\n Votre voiture bloque la mienne, merci de bien vouloir la déplacer.";
        this.sendSMS(telephone, alertMessage);
        
      }, (err) => {
        this.presentAlert("Pas d'information !", "La voiture : "+ plate + " <br/> n'est pas enregistrée dans le système <br> Prière de vérifier avec l'agent de stationnement, merci ")
        console.log(err);
      })

    }
    

    
  }

}
