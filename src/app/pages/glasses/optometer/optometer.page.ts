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
  VisitID:string;
  Visit:Visit = new Visit();
  constructor(
    private route: ActivatedRoute,
    public sharedService: SharedService,
    private dataService: DataService,
    private loading: LoadingController
  ) {
    this.route.url.subscribe(res=>{
      this.VisitID = this.route.snapshot.params.id;
    })
  }

  async ngOnInit() {
     if(this.VisitID){
      const loader = await this.loading.create({
        message: "Loading...",
        spinner: "crescent",
      });
      await loader.present();
      this.dataService
        .getWithId(Endpoints.SingleVisit, this.VisitID)
        .pipe(
          finalize(() => {
            loader.dismiss();
          })
        )
        .subscribe((res: any) => {
          if (res) {
            this.Visit = res;
            console.log("🚀 ~ file: optometer.page.ts ~ line 45 ~ OptometerPage ~ this.Visit=res.map ~ this.Visit", this.Visit)
          }
        });
     }
  }
}
