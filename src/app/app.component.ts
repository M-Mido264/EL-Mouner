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

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  providers: [InAppBrowser],
})
export class AppComponent {
  menuSide = "start";
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private inAppBrowser: InAppBrowser,
    private userService: UserService,
    private dataService: DataService,
    private router: Router,
    public loading: LoadingController,
    private sharedService: SharedService
  ) {
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
                //this.sharedService.patientId = res.patientId;
                localStorage.setItem("accessToken", res.access_token);
                localStorage.setItem("userName", res.userName);
                localStorage.setItem("password", password);
                localStorage.setItem("userId", res.clientId);
                //localStorage.setItem("patientId", res.patientId);
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

  logout() {
    this.dataService.logout();
  }
}
