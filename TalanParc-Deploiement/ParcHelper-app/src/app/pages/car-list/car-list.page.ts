import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.page.html',
  styleUrls: ['./car-list.page.scss'],
})
export class CarListPage implements OnInit {
  list : any;
  length: number = 0;
  
  constructor(private carService: CarService, private alertController: AlertController) { 
  }

  ngOnInit() {
    this.carService.getAllUserCars().subscribe(res => {
      
      this.list = res;
      this.length = this.list.length;
      console.log(this.list);
      console.log(this.length);
      
      
    }, (err) => {
      console.log(err.error);
      
      
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
    this.ngOnInit();
  }

  deleteCar(id){
    this.carService.deleteCar(id).subscribe(res => {
      this.presentAlert("Véhicule supprimée !", "Vous avez suprimé la voiture ")
    }, (err) => {
      this.presentAlert(" Echec !", "Essyez une autre fois") 
    });
  }
  
}
