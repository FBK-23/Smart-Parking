import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  @Inject(ActivatedRoute) private _activatedroute : ActivatedRoute
  isVerify = false;
  mailAlreadyVerified = false;
  email
  constructor(
    private authservice: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
   
    this.route.queryParams
    .subscribe(params => {
      console.log('token',params.token);
      let token = params.token;
      this.authservice.activated(token).subscribe(
        res =>{
         console.log('Compte activé !!')
      },) 
    }
  );
    
  }
}
