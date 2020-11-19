import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
  

@Injectable({
  providedIn: 'root'
})
export class UserService  {

  constructor(public jwtHelper: JwtHelperService , private storage:Storage) {
  }

    public  isAuthenticated() {
      const token = localStorage.getItem('accessToken');
      return !this.jwtHelper.isTokenExpired(token);
    }
     
}
