import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Car } from 'src/app/models/Car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.page.html',
  styleUrls: ['./add-car.page.scss'],
})
export class AddCarPage implements OnInit {

  public formGroup: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private carservice: CarService,
    private alertController: AlertController

    ) {
    this.formGroup = this.formBuilder.group({
      plateType: [null,
        Validators.compose([
          Validators.required,
        ])],
      plateLeft: [null,
        Validators.compose([
          Validators.required,
        ])],
      plateRight: [null,
        Validators.compose([
          Validators.required,
        ])],
      matricule: [null,
        Validators.compose([
          Validators.required,
        ])],
      batiment:[null,
        Validators.compose([
          Validators.required,
        ])],
      marque: [null,
        Validators.compose([
          Validators.required,
        ])]
    });
  }
  validation_messages = {
    plateLeft: [
      {type: 'required', message: 'Champs obligatoire !'},
    ],
    plateRight: [
      {type: 'required', message: 'Champs obligatoire !'},
    ],
    batiment: [
      {type: 'required', message: 'Champs obligatoire !'},

    ],
    matricule: [
      {type: 'required', message: 'Champs obligatoire !'},
    ],
    marque: [
      {type: 'required', message: 'Champs obligatoire !'},
    ]
  };

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: '',
      subHeader,
      message,
      buttons: [
        {
          text: 'OK'

        }
      ],
    });

    await alert.present();

  }

  ngOnInit() {
    this.formGroup.reset();
  }

  addMyCar(car: Car){

    if (car.plateType == 'TUN' ) {
      car.matricule = car.plateLeft + ' TUN ' + car.plateRight;
    }

    else
      {car.matricule = car.matricule + ' FCR';}

   this.carservice.addCar(car).subscribe(res => {
      console.log(res);
      this.presentAlert('Ajout avec succès', 'Vous avez ajouté une voiture : '+ car.marque  +
        ' ayant un numéro d\'immatriculation : <br>'+ car.matricule + '<br> au batiment : '+ car.batiment );
        this.router.navigate(['/car-list']).then(() => {
          setTimeout(()=>{
            window.location.reload();
        }, 2500);
        });
    }, (err) => {
      console.log(err.error);
      this.presentAlert('Echec ', 'Voiture déja existante ou les champs sont mal saisis');
    });

  }

}

