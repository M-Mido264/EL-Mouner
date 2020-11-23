import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-sevices',
  templateUrl: './sevices.page.html',
  styleUrls: ['./sevices.page.scss'],
})
export class SevicesPage implements OnInit {
  backButtonSubscription;
  constructor(private router:Router,private platefrom: Platform) { }

  ngOnInit() {
  }
  
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

  goToServiceDetails(serviceNo: number){
    this.router.navigate(['sevices/single-service',serviceNo]);
  }

}
