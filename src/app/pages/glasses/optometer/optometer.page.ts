import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Visit } from 'src/app/models/Visit';
import { Endpoints } from 'src/app/services/api.endpoints';
import { DataService } from 'src/app/services/data.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: "app-optometer",
  templateUrl: "./optometer.page.html",
  styleUrls: ["./optometer.page.scss"],
})
export class OptometerPage implements OnInit {
  Visit:Visit = new Visit();
  constructor(
    private route: ActivatedRoute,
    public sharedService: SharedService,
    private dataService: DataService,
    private loading: LoadingController
  ) {
   
  }

  ionViewWillEnter() {
    const obj = localStorage.getItem("glassesDetails");
    this.Visit = JSON.parse(obj);
    console.log(
      "🚀 ~ file: voucher.page.ts ~ line 24 ~ optometerPage ~ ionViewWillEnter ~ this.Visit",
      this.Visit
    );
  }

   ngOnInit() {
  }
}
