import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarService {

    URL = 'http://localhost:3000/api/';
    constructor(private httpClient: HttpClient) {

    }

    
      findCarbyMatricule(matricule: string) {
        return this.httpClient.get(this.URL+"cars/findCarbyMatricule/"+matricule);
      }
  
      // Utiliser pour lister les voitures et leurs propriétaires [Admin]
      getAll(){
        return this.httpClient.get(this.URL+"admin/usercar");
      }
      // Utiliser pour compter les voitures [Admin Dash]
      getAllCars(){
        return this.httpClient.get(this.URL+"admin/cars");
      }
      // Utiliser pour lister les propriétaires seulement [Admin]
      getOwner(){
        return this.httpClient.get(this.URL+"admin/");
      }

      // ajouter voiture [user]
      addCar(dataCar){
        var reqHeader = new HttpHeaders({ 
          'authorization': 'Bearer ' + localStorage.getItem('token')
       });
       console.log('token in service', reqHeader)
        return this.httpClient.post(this.URL + "user/saveUserCar", dataCar ,{ headers: reqHeader });
      }
      // Utiliser pour supprimer les voitures [user]
      deleteCar(id){
        return this.httpClient.delete(this.URL + "user/delete/"+id);
      }
      // Utiliser pour supprimer les voitures [Admin]
      delete(id){
        return this.httpClient.delete(this.URL+"admin/delete/"+id );
      }
      // Utiliser pour supprimer les propriétaires [Admin]
      deleteUser(id){
        return this.httpClient.delete(this.URL+"admin/deleteUser/"+id );
      }
      // Utiliser pour chercher les voitures [user]
      searchCarOwnerNumber(plateNumber: string) {
        return this.httpClient.get(this.URL + "user/userByCar/findInWeb/"+ plateNumber);
      }
      

}
