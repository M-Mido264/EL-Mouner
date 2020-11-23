import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: "app-single-service",
  templateUrl: "./single-service.page.html",
  styleUrls: ["./single-service.page.scss"],
})
export class SingleServicePage implements OnInit {
  serviceNo: number;
  backButtonSubscription;
  constructor(private route: ActivatedRoute,private router:Router,private platefrom: Platform) {
    this.route.url.subscribe((res) => {
      this.serviceNo = this.route.snapshot.params.id;
    });
  }

   ionViewWillEnter() {
    this.backButtonSubscription = this.platefrom.backButton.subscribeWithPriority(1,
      async () => {
        this.router.navigate(["/sevices"]);
      }
    );
  }
  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  ngOnInit() {
    console.log("🚀 ~ file: single-service.page.ts ~ line 16 ~ SingleServicePage ~ constructor ~ this.serviceNo", this.serviceNo)
  }
}
