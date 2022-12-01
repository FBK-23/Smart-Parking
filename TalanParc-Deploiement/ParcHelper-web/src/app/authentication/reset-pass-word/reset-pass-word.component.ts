import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { MatDialog} from '@angular/material/dialog';
import { NotificationComponent } from './notification/notification.component';




@Component({
  selector: 'app-reset-pass-word',
  templateUrl: './reset-pass-word.component.html',
  styleUrls: ['./reset-pass-word.component.css']
})
export class ResetPassWordComponent implements OnInit {

  authForm: FormGroup;
  constructor(
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      passWord: [''],
      confirmPassWord: ['']
    });
  }

  onSubmit(formValues){
    this.matDialog.open(NotificationComponent);
    this.route.queryParams
    .subscribe(params => {
      let token = params.token;
      this.authservice.forgetPassword(token, formValues.passWord).subscribe(
        res =>{
      },) 
    }
  );
  setTimeout(()=>{
    this.router.navigate(['/authentication/signin']);
  }, 1200);

  }

}
