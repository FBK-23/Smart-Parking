import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/Car';
import { SERVER_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  addCar(car: Car){
    return this.http.post(SERVER_URL + 'api/user/saveUserCar', car);
  }

  getAllUserCars(){
    return this.http.get(SERVER_URL + 'api/user/carsByUser');
  }

  deleteCar(id){
    return this.http.delete(SERVER_URL + 'api/user/delete/'+id);
  }

}
