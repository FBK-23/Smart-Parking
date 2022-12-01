import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserCarService {


    URL = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) {

   }


  getCarsByUser(id){
    return this.http.get(this.URL+"usercar/carsByUser/"+id);
  }
  getUsersByCarfind(matricule){
    return this.http.get(this.URL+"usercar/usersByCar/find/"+matricule);
  }

  getUsersByCar(id){
    return this.http.get(this.URL+"usercar/usersByCar/"+id);
  }
  add(userCar){
    return this.http.post(this.URL+"usercar/saveUsercar",userCar);
  }

  delete(userCar){
    return this.http.post(this.URL+"usercar/delete",userCar);
  }



}
