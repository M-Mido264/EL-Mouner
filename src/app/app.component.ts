import { Component } from '@angular/core';

import { LoadingController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UserService } from './services/user.service';
import { DataService } from './services/data.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Endpoints } from './services/api.endpoints';
import { SharedService } from './services/shared.service';
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  providers: [InAppBrowser],
})
export class AppComponent {
  menuSide = "start";
  userName:string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private inAppBrowser: InAppBrowser,
    private userService: UserService,
    private dataService: DataService,
    private router: Router,
    public loading: LoadingController,
    private androidPermissions: AndroidPermissions,
    public sharedService: SharedService
  ) {
    this.platform.ready().then(() => {
      this.checkNetworkPermission();
    });
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    const accessToken = localStorage.getItem("accessToken");
    console.log("AppComponent -> initializeApp -> accessToken", accessToken)
    if (accessToken) {
      this.CheckAuthentication();
    }
  }

  async CheckAuthentication() {
    if (this.userService.isAuthenticated()) {
      this.sharedService.UserName = localStorage.getItem("userName");
      this.router.navigate(["/tabs"]);
    } else {
      const userName = localStorage.getItem("userName");
      const password = localStorage.getItem("password");
      if (userName && password) {
        const loader = await this.loading.create({
          message: "Loading...",
          spinner: "crescent",
        });
        await loader.present();
        var loginObject = {
          UserName: userName,
          Password: password,
        };
        this.dataService
          .post(Endpoints.login, loginObject)
          .pipe(
            finalize(() => {
              loader.dismiss();
            })
          )
          .subscribe(
            async (res: any) => {
              console.log("AppComponent -> CheckAuthentication -> res", res);
              if (res.access_token) {
                this.sharedService.accessToken = res.access_token;
                this.sharedService.userId = res.clientId;
                this.sharedService.patientId = res.patientId;
                this.sharedService.UserName = res.userName;
                localStorage.setItem("accessToken", res.access_token);
                localStorage.setItem("userName", res.userName);
                localStorage.setItem("password", password);
                localStorage.setItem("userId", res.clientId);
                localStorage.setItem("patientId", res.patientId);
                this.router.navigate(["/tabs"]);
              }
            },
            (err) => {
              this.router.navigate(["/login"]);
            }
          );
      }
    }
  }

  goTofacebookPage() {
    this.inAppBrowser.create("https://www.facebook.com/AlmouneerDEC/");
  }
  goToTwitter() {
    this.inAppBrowser.create("https://twitter.com/AlmouneerDEC/");
  }
  goToInstagram() {
    this.inAppBrowser.create("https://www.instagram.com/almouneer/");
  }

  logout() {
    this.dataService.logout();
  }

  checkNetworkPermission() {
    this.androidPermissions
      .checkPermission(
        this.androidPermissions.PERMISSION.ACCESS_NETWORK_STATE
      )
      .then(
        (result) => {
          if (result.hasPermission) {
            console.log('had network permissions')
          } else {
            //If not having permission ask for permission
            this.androidPermissions
          .requestPermission(
            this.androidPermissions.PERMISSION.ACCESS_NETWORK_STATE
          )
          .then(
            () => {
              // call method to turn on network
              console.log(
                "requestPermission Error requesting netwok permissions granted"
              );
            },
            (error) => {
              //Show alert if user click on 'No Thanks'
              console.log(
                "requestPermission Error requesting network permissions " +
                  error
              );
            }
          );
          }
        },
        (err) => {
          alert(err);
        }
      );
  }
}
