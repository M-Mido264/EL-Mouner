import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.page.html',
  styleUrls: ['./medicine.page.scss'],
})
export class MedicinePage implements OnInit {
  backButtonSubscription;
  constructor(private platefrom: Platform, private router: Router) { }

  // ionViewWillEnter() {
  //   this.backButtonSubscription = this.platefrom.backButton.subscribe(
  //     async () => {
  //       this.router.navigate(["/tabs/home"]);
  //     }
  //   );
  // }
  // ionViewDidLeave() {
  //   this.backButtonSubscription.unsubscribe();
  // }

  ngOnInit() {
  }

}