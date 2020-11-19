import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { MenuController } from '@ionic/angular';



 
 @Injectable({
   providedIn: "root",
 })
 export class SharedService {
   _accessToken;
   _userId;
   _patientId;
   _lang;
   _RefusedReasons;
   _profileData;

   set RefusedReasons(data) {
     this._RefusedReasons = data;
   }
   get RefusedReasons() {
     return this._RefusedReasons;
   }

   set accessToken(data) {
     this._accessToken = data;
   }
   get accessToken() {
     return this._accessToken;
   }

   set userId(data) {
     this._userId = data;
   }
   get userId() {
     return this._userId;
   }
   set patientId(data) {
     this._patientId = data;
   }
   get patientId() {
     return this._patientId;
   }

   set lang(data) {
     this._lang = data;
   }
   get lang() {
     return this._lang;
   }

   set profileData(data) {
     this._profileData = data;
   }
   get profileData() {
     return this._profileData;
   }

   constructor(
     public storage: Storage,
     private router: Router,
     private user: UserService,
     private menu: MenuController
   ) {}

   toggleMenu() {
     this.menu.open("usermenu");
   }

   async loadHomePage() {
     if (this.user.isAuthenticated()) {
       this.router.navigateByUrl("/home");
     } else {
       this.router.navigateByUrl("/login");
     }
   }

   async isFirstLoad() {
     let isFirstLoad = false;
     await this.storage.get("first_load").then((val) => {
       if (val == null) isFirstLoad = true;
       else isFirstLoad = false;
     });
     return isFirstLoad;
   }

   setAppLoaded() {
     //this.storage.set('first_load',true);
     localStorage.setItem("first_load", "true");
   }

   displayImg(img, is_online = true) {
     if (img == null || img == "") return "assets/images/no-img.png";
     if (is_online) {
       return img;
     } else {
       return img;
     }
   }
 }

 