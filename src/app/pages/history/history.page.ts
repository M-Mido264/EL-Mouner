import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: "app-history",
  templateUrl: "./history.page.html",
  styleUrls: ["./history.page.scss"],
})
export class HistoryPage implements OnInit {
  backButtonSubscription;
  IsLoading: Boolean = false;
  
  constructor(
    private platefrom: Platform,
    private router: Router,
    public sharedService: SharedService,
    public loading: LoadingController,
    private dataService: DataService
  ) {}

  ionViewWillEnter() {
    this.backButtonSubscription = this.platefrom.backButton.subscribeWithPriority(
      1,
      async () => {
        this.router.navigate(["/tabs/home"]);
      }
    );
  }
  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  ngOnInit() {}
}
