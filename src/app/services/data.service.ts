import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { SharedService } from './shared.service';
import { Storage } from '@ionic/storage';

import { Endpoints } from './api.endpoints';
// import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient,private router: Router,
    // private translate: TranslateService,
    public storage: Storage,
     private alertCtrl: AlertController ,private sharedService: SharedService) {
  }


  get(url) {
    return this.httpClient.get(url);
  }

  getWithParam(url,param) {
    return this.httpClient.get(url+"?senderId="+param);
  }


  getWithId(url,id){
    return this.httpClient.get(url+"/"+id);
  }
  

  post(url, data) {
    console.log(url);
    console.log(data)
    let headers = new HttpHeaders({

      'Content-Type': 'application/json'
    });
    return this.httpClient.post(url, data, { headers: headers });
  }

  handleErrors(error) {
    if (error.status === 404) this.createAlert('Not Found');
    else if (error.status === 422) this.createAlert('In Correct Entries Data');
    else if (error.status === 401) this.createAlert('Not Authorized');
    else this.createAlert('Sorry, There somthing wrog');
  }

  createAlert(message) {
    this.alertCtrl.create({
      subHeader: 'Error',
      message,
      buttons: [
        'Ok'
      ]
    }).then((alert) => {
      alert.present()
    })
  }

  secure_post(url, data) {
    console.log("this.sharedService.userId", this.sharedService.userId);
    let headers = new HttpHeaders({
      // 'Accept':'application/json',
      'Authorization': this.sharedService.accessToken,
      'Id': this.sharedService.userId.toString()
    });
    return this.httpClient.post(url, data, { headers: headers });
  }
  secure_Update(url, data) {

    console.log("this.sharedService.userId", this.sharedService.userId);
    let headers = new HttpHeaders({
      // 'Accept':'application/json',
      'Authorization': this.sharedService.accessToken,
      'Id': this.sharedService.userId.toString()
    });
    return this.httpClient.put(url, data, { headers: headers });
  }

  secure_post_no_id(url, data) {
    console.log(localStorage.getItem('Cloudtoken'));
    let headers = new HttpHeaders({
      // 'Accept':'application/json',
      'Authorization': this.sharedService.accessToken,
    });
    return this.httpClient.post(url, data, { headers: headers });
  }

  secure_get(url, params?) {
    let headers = new HttpHeaders({
      // 'Accept':'application/json',
      'Content-Type': 'application/json',
      'Authorization': this.sharedService.accessToken,
      'Id': this.sharedService.userId.toString()
    });

    return this.httpClient.get(url, { headers: headers, params: params || null });
  }


  uploadMultupart(url, data) {
    console.log('form data', data);
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for (const item in data) {
        formData.append(item, data[item]);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open("POST", url, true);
      xhr.setRequestHeader('Authorization', this.sharedService.accessToken);
      xhr.send(formData);
    });
  }

  getProfileData() {
    //this.secure_get(Endpoints.Patient, {patientId: this.sharedService.patientId})
    this.getWithId(Endpoints.Patient,this.sharedService.patientId)
    .subscribe( (profileData: any) => {
      this.sharedService.profileData = profileData;
      localStorage.setItem("profileData",JSON.stringify(profileData));
    },err=>{
      if(err.status == 401){
        this.logout();
      }
    });
  }
  // createEnAlert(message: string) {
  //   this.alertCtrl
  //     .create({
  //       subHeader: this.translate.instant("exceptionError.Warning"),
  //       message: this.translate.instant("exceptionError." + message),
  //       buttons: [this.translate.instant("exceptionError.Ok")]
  //     })
  //     .then(alert => {
  //       alert.present();
  //     });
  // }
   logout(){  

    this.sharedService.userId = null;
    this.sharedService.accessToken = null;
    this.sharedService.patientId = null;
    this.sharedService.UserName = null;
    this.sharedService.profileData = null;
    this.sharedService.lang = null;
    // localStorage.removeItem('lang');
    localStorage.removeItem('userName');
    localStorage.removeItem('password');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('patientId');
    localStorage.removeItem('profileData');
    
    this.storage.remove('userId').then(() => {
    }).then(() => {
      this.storage.remove('userName');
    })
    .then(() => {
      this.router.navigate(['/login', {skipLocationChange: true }]);
    })
  }


  // setLang(){
  //   if (!localStorage.getItem('lang')) {
  //     this.sharedService.lang = 'ar';
  //     this.default_lang = 'ar';
  //     this.translate.setDefaultLang('ar');
  //     this.translate.use('ar');
  //   } else {
  //     this.sharedService.lang = localStorage.getItem('lang');
  //     this.default_lang = localStorage.getItem('lang');
  //     this.translate.setDefaultLang(localStorage.getItem('lang'));
  //     this.translate.use(localStorage.getItem('lang'));
  //   }
  // }

}

export enum storageKeys {
  accessToken,
  userName,
  password
}
