import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: "app-booking",
  templateUrl: "./booking.page.html",
  styleUrls: ["./booking.page.scss"],
})
export class BookingPage implements OnInit {
  backButtonSubscription;
  constructor(
    private platefrom: Platform,
    private router: Router,
    public sharedService: SharedService
  ) {}

  ionViewWillEnter() {
    this.backButtonSubscription = this.platefrom.backButton.subscribeWithPriority(
      1,
      async () => {
        this.router.navigate(["/tabs"]);
      }
    );
  }
  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  ngOnInit() {}

  openAdding() {
    console.log("add");
    this.router.navigate(["/booking/add-edit-booking"]);
  }
}
