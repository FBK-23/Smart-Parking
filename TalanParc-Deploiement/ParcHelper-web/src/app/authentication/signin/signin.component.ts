import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { Role } from "src/app/core/models/role";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    
    this.authForm = this.formBuilder.group({
      email: ["firas.bargui@talan.com", Validators.required],
      password: ["aA123456", Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }

  login(user) {
    
    this.authService.login(user).subscribe(
      res => {
      localStorage.setItem('token', res['token']);
      let token = localStorage.getItem('token');
      this.getUser(token)
      
    }, (err) => {
      this.error= err;
    })
  }
  private getUser(token){
    localStorage.setItem('currentUser',(atob(token.split(".")[1])));
    let result = localStorage.getItem('currentUser');
    const userRole = JSON.parse(result).role;
    if (userRole === Role.Admin) {
      setTimeout(()=>{
        this.router.navigate(['/admin/car-list']);
      }, 1000);
      
    } else if (userRole === Role.User) {
      setTimeout(()=>{
        this.router.navigate(['/patient/dashboard']);
      }, 1000);

    }
  }
}
