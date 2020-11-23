import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-get-in-touch',
  templateUrl: './get-in-touch.page.html',
  styleUrls: ['./get-in-touch.page.scss'],
})
export class GetInTouchPage implements OnInit {
  backButtonSubscription;
  constructor(private platefrom: Platform, private router: Router) { }

  ionViewWillEnter() {
    this.backButtonSubscription = this.platefrom.backButton.subscribeWithPriority(1,
      async () => {
        this.router.navigate(["/tabs"]);
      }
    );
  }
  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  ngOnInit() {
  }

}
