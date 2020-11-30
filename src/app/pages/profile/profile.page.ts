import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  backButtonSubscription;
  Email:string;
  UserProfile:any;
  constructor(
    private platform: Platform,
    private router: Router,
    public sharedService: SharedService
  ) {}

  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(
      1,
      async () => {
        this.router.navigate(["/tabs"]);
      }
    );
  }
  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  ngOnInit() {
    this.Email = localStorage.getItem("userName");
    console.log("🚀 ~ file: profile.page.ts ~ line 37 ~ ProfilePage ~ ngOnInit ~ this.UserProfile", this.sharedService.profileData)
  }
}
