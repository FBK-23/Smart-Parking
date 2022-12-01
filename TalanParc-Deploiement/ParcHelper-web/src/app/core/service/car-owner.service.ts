import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarOwnerService {

    URL = 'http://localhost:3000/api/';
    constructor(private httpClient: HttpClient) {

    }

    // utiliser pour lister les voitures [user]
    getCarsByUser(){
      var reqHeader = new HttpHeaders({ 
        'authorization': 'Bearer ' + localStorage.getItem('token')
     });
      return this.httpClient.get(this.URL+"user/carsByUser",{ headers: reqHeader });
    }
    
    addUser(data){
      return this.httpClient.post(this.URL+"user/addUser",data);
    }

    sendMailForgetPass(email){
      console.log('fil service',email);
      return this.httpClient.post(this.URL + 'user/sendMailforgetPass', {"email": email});
    }

    // ok used in new template
    getAll(){
      return this.httpClient.get(this.URL+"users");
    }
    getById(id){
      return this.httpClient.get(this.URL+"users"+id);
    }

    // ok used in new template
    addOwner(user){
  
      return this.httpClient.post(this.URL+"user/addUser",user);
    }
    // ok used in new template
    updateOwner(id,user){
  
      return this.httpClient.put(this.URL+"users/"+id,user);
    }
    //update(user){
  //
    //  return this.httpClient.put(this.URL+"users/updateProfile",user,{ observe: 'response', headers: new HttpHeaders({
    //      'Content-Type' : 'application/json' })
    //  });
    //}
  
    //Adminupdate(user){
  //
    //  return this.httpClient.put(this.URL+"users/AdminupdateProfiles",user,{ observe: 'response', headers: new HttpHeaders({
    //      'Content-Type' : 'application/json' })
    //  });
    //}
  
  
    delete(id){
      return this.httpClient.delete(this.URL+"users/delete/"+id);
    }
    loggedIn() {
      const token = localStorage.getItem('token');
      return !!token;
    }
    login(user){
      return this.httpClient.post(this.URL+"users/authenticate",user);
    }
    loggedUserDetails() {
      return this.httpClient.post(this.URL + 'users/decodetoken', {'token': localStorage.getItem('token')});
    }
  
    register(user){
      return this.httpClient.post(this.URL+"users/createpassword",user);
    }
  
    saveUser(user){
      return this.httpClient.post(this.URL+"users",user);
    }
  
    verifyEmail(payload) {
       return  this.httpClient.post(this.URL+"users/confirmationPost/"+payload.token,payload.token);
    }
    
  
    resetPassword(user){
  
      return this.httpClient.put(this.URL+"users/resetPassword",user,{ observe: 'response', headers: new HttpHeaders({
          'Content-Type' : 'application/json' })
      });
    }
  
    resendTokenPost(email){
      return  this.httpClient.post(this.URL+"users/resendTokenPost",email);
    }
  
    forgetPassword(email){
      return this.httpClient.post(this.URL+"password",email);
    }
  
    findUserbyToken(token){
      return this.httpClient.get(this.URL+"password/findUserbyToken/"+token);
    }
  

  
}
