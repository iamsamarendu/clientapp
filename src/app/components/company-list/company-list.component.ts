import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies:any;
  currentCompany = null;
  currentIndex=-1;
  name = '';
  constructor(private companyService: CompanyService,private _router: Router,
    private _auth: AuthenticationService,) { 

    }

  ngOnInit(): void {
    var authenticatedUser = this._auth.getAuthenticatedUser();
    
    if(authenticatedUser == null){
     
      this._router.navigateByUrl('/login');
   } else {
    this.readCompanies();
   }
  }
  readCompanies(): void {
    console.log('inside list commponent');
    this.companyService.readAll()
        .subscribe(
          companies=>{
            this.companies = companies;
            console.log("respose:");
            console.log(companies);
          },
          error =>{
            console.log('error :');
            console.log(error);
          }
        )
  }
}
