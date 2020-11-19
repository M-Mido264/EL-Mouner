import { Component } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  show:Boolean = false;
  segment :string = 'ARTICLES';
  backButtonSubscription;
  constructor(private platefrom: Platform,private alertController: AlertController) {}

  showHideSearchBar(){
    this.show = !this.show;
  }
  ionViewDidEnter() {
    this.backButtonSubscription = this.platefrom.backButton.subscribeWithPriority(0,
      async () => {
        this.closeApp();
        //navigator["app"].exitApp();
      }
    );
  }
  ionViewWillLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  async closeApp() {
    const alert = await this.alertController.create({
      header: "Cnfirmation",
      message: "Do you want realy close the app",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            alert.dismiss();
          }
        },
        {
          text: "Ok",
          handler: () => {
            navigator["app"].exitApp();
          }
        }
      ]
    });

    alert.present();
  }
}


