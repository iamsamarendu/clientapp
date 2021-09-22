import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

const baseURL = 'https://ia8cc66bf0.execute-api.us-east-1.amazonaws.com/dev/api/v1/market/company'

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }
  
  readAll(): Observable<any>{
    console.log('Inside readAll');
        
    return this.httpClient.get(`${baseURL}/getall`, this.getHeader());
  }
  readCompany(companyCode: any): Observable<any>{
    return this.httpClient.get(`${baseURL}/info/${companyCode}`,  this.getHeader());
  }
  getHeader(){
    var accessToken = localStorage.getItem("idToken");
    return {
      headers: new HttpHeaders()
        .set('XemarketToken',  `${accessToken}`)
    }
     
  }
}
