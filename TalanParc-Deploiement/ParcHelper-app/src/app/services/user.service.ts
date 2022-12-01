import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  add(user: User) {
    return this.http.post(SERVER_URL + 'api/user/addUser', user);
  }

  login(user: User) {
    return this.http.post(SERVER_URL + 'api/user/authenticate', user);
  }
  sendMailForgetPass(email){
    console.log('fil service',email);
    return this.http.post(SERVER_URL + 'api/user/sendMailforgetPass', {email});
  }

  resetPassword(passwordReset) {
    return this.http.put(SERVER_URL + 'api/user/resetPassword', passwordReset);
  }

  searchCarOwnerNumber(plateNumber: string) {
    return this.http.get(SERVER_URL + 'api/user/userByCar/find/'+ plateNumber);
  }

}
