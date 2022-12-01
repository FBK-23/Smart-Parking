import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject : BehaviorSubject<User>
  private currentUser : Observable<User>
  URL = 'http://localhost:3000/api/';

  constructor(private httpClient: HttpClient,public jwtHelper: JwtHelperService) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;

  }
  public getToken(): string {
    return localStorage.getItem('token')
  }

  public isAuthenticated(): boolean {

    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }

  
  // Envoie de mail contenant un lien d'acctivation de compte 
  activated(token: string){
    return this.httpClient.post(this.URL+'user/confirmationPost/'+ token, {})
  }
  
  forgetPassword(token: string, password: string){
    
    return this.httpClient.post(this.URL+'user/forgetPassword/'+ token, {"password":password})
  }

  login(user) {
    return this.httpClient.post(this.URL + "user/authenticate", user);
  }
  

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return of({ success: false });
  }
}
