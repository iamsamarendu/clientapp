import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailVerificationMessage: boolean = false;

  constructor(private auth: AuthenticationService,
              private _router: Router) {

  }


  onSubmit(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;
    
    this.auth.signIn(email, password).subscribe((data:any) => {
      
      this._router.navigateByUrl('/');
    }, (err:any)=> {
      console.log(err);
      this.emailVerificationMessage = true;
    });   
  }


}
