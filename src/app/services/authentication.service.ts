import { Injectable } from '@angular/core';
import {AuthenticationDetails, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';

const poolData = {
  UserPoolId: 'us-east-1_EOBYGB98g', // Your user pool id here
  ClientId: '3r77rd3cnsivhj7amsq7prrn9c' // Your client id here  
};

const userPool = new CognitoUserPool(poolData);
@Injectable()
export class AuthenticationService {
  cognitoUser: any;
  token:any;
  constructor() {
    this.token = null;
   }
  isLoggedIn() {    
   // console.log(userPool.getCurrentUser());
    return userPool.getCurrentUser() != null;
  }

  getAuthenticatedUser() {
    // gets the current user from the local storage
    return userPool.getCurrentUser();
  }
 
  logOut() {
    this.getAuthenticatedUser()?.signOut();
    this.cognitoUser = null;
    localStorage.setItem("idToken",'');
  }
  signIn(email:any, password:any) { 

    const authenticationData = {
      Username : email,
      Password : password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username : email,
      Pool : userPool
    };
    const cognitoUser = new CognitoUser(userData);
    return Observable.create((observer: { next: (arg0: import("amazon-cognito-identity-js").CognitoUserSession) => void; complete: () => void; error: (arg0: any) => void; }) => {

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          var token = result.getIdToken();
          localStorage.setItem("idToken",token.getJwtToken());
          console.log(result.getIdToken())
          observer.next(result);
          observer.complete();
        },
        onFailure: function(err) {
          console.log(err);
          observer.error(err);
        },
      });
      
    });
    
  }
}
