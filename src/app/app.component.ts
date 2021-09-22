import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EmarketClient';
  
  constructor(public _auth: AuthenticationService,
    private _router: Router) { }

doLogout(){    
this._auth.logOut();
this._router.navigateByUrl('/login');
}
}
