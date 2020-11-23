import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-glasses',
  templateUrl: './glasses.page.html',
  styleUrls: ['./glasses.page.scss'],
})
export class GlassesPage implements OnInit {
  backButtonSubscription
  constructor(private platefrom: Platform,private router: Router) { }

  ionViewWillEnter() {
    this.backButtonSubscription = this.platefrom.backButton.subscribeWithPriority(1,
      async () => {
         this.router.navigateByUrl('tabs/home')
      }
    );
  }
  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  ngOnInit() {
  }

}
