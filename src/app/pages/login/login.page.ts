import { Component, OnInit, Renderer2 } from '@angular/core';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { SharedService } from 'src/app/services/shared.service';
import { Endpoints } from 'src/app/services/api.endpoints';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers:[Keyboard]
})
export class LoginPage implements OnInit {
  backButtonSubscription;
  LoginForm: FormGroup;
  isSigned = false;
  constructor(private platefrom: Platform,
    public keyboard: Keyboard,
    private router:Router,
    public FormBuilder: FormBuilder,
    private dataService: DataService,
    public loading: LoadingController,
    private sharedService: SharedService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
) {
  this.LoginForm = this.FormBuilder.group({
    UserName: [ //email
      "",
      Validators.compose([Validators.required,Validators.pattern("[a-z0-9.-_]{1,}@[a-z.-]{2,}[.]{1}[a-z]{2,4}")])
    ],
    Password: [
      "",
      Validators.compose([Validators.required, Validators.minLength(6)])
    ]
  });
 }


  ionViewDidEnter() {
    this.backButtonSubscription = this.platefrom.backButton.subscribe(
      async () => {
        navigator["app"].exitApp();
      }
    );
  }
  ionViewWillLeave() {
    this.backButtonSubscription.unsubscribe();
  }


  ngOnInit() {
  }

  getInput(input): AbstractControl {
    return this.LoginForm.controls[input];
  }

  async Login() {
    this.isSigned = true;
    if (this.LoginForm.valid) {
      const loader = await this.loading.create({
        message:
          "Loading...",
        spinner: "crescent"
      });
      await loader.present();
      var loginObject = {
        Password: this.LoginForm.value.Password.trim(),
        UserName: this.LoginForm.value.UserName.trim()
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
          console.log("LoginPage -> Login -> res", res)
            if (res.access_token) {
              this.sharedService.accessToken = res.access_token;
              this.sharedService.userId = res.clientId;
              this.sharedService.patientId = res.patientId;
                localStorage.setItem("accessToken", res.access_token);
                localStorage.setItem("userName", res.userName);
                localStorage.setItem("password", this.LoginForm.value.Password);
                localStorage.setItem("userId", res.clientId);
                localStorage.setItem("patientId", res.patientId);
                this.router.navigate(["/tabs"]);
                this.LoginForm.reset();
                this.isSigned = false;
            }
          },
          err => {
            console.log(err);
            if (err.error === "Wrong Username or password") {
              this.createEnAlert(err.error);
              loader.dismiss();
            } 
            else {
              this.presentError();
              loader.dismiss();
            }
          }
        );
    } else {
      for (const input in this.LoginForm.controls) {
        if (this.LoginForm.controls[input].invalid) {
          const element = <HTMLElement>(
            document.querySelectorAll(`[formcontrolname="${input}"]`)[0]
          );
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "nearest"
            });
          }
          break;
        }
      }
    }
  }

  createEnAlert(message: string) {
    this.alertCtrl
      .create({
        subHeader: 'Error',
        message: message,
        buttons: ["Ok"]
      })
      .then(alert => {
        alert.present();
      });
  }

  async presentError() {
    let toast = this.toastCtrl.create({
      message: "Check Network",
      duration: 3000,
      position: "top"
    });
    (await toast).present();
  }

}
