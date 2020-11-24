import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  backButtonSubscription;
  constructor(private platform: Platform, private router:Router) { }

  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(1,
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
