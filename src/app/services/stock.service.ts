import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
const baseURL = 'https://ia8cc66bf0.execute-api.us-east-1.amazonaws.com/dev/api/v1/market/stock'
@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpClient: HttpClient, private authService:AuthenticationService) { }
  readStock(comapnyCode:any, startDate:any, endDate:any): Observable<any>{
    console.log('Inside stock service');
  return this.httpClient.get(`${baseURL}/get/${comapnyCode}/${startDate}/${endDate}`, this.getHeader())
  }
  getHeader(){
    var accessToken = localStorage.getItem("idToken");
    return {
      headers: new HttpHeaders()
        .set('XemarketToken',  `${accessToken}`)
    }
     
  }
}
