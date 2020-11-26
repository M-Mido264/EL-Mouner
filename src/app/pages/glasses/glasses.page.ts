import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Glasses } from 'src/app/models/Glasses';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: "app-glasses",
  templateUrl: "./glasses.page.html",
  styleUrls: ["./glasses.page.scss"],
})
export class GlassesPage implements OnInit {
  backButtonSubscription;
  Glasses: Glasses[] = [];
  constructor(private platefrom: Platform, private router: Router, public sharedService:SharedService) {}

  ionViewWillEnter() {
    this.backButtonSubscription = this.platefrom.backButton.subscribeWithPriority(
      1,
      async () => {
        this.router.navigateByUrl("tabs/home");
      }
    );
  }
  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  ngOnInit() {
    console.log(this.Glasses.length)
    console.log(this.sharedService.patientId)
  }
}
