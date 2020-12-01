import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { History } from 'src/app/models/History';
import { Endpoints } from 'src/app/services/api.endpoints';
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
  Histories: History[] = [];
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
    this.getData();
  }
  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  ngOnInit() {}

  async getData() {
    this.Histories = [];
    if (
      this.sharedService.patientId &&
      this.sharedService.patientId !== "null"
    ) {
      this.IsLoading = true;
      const loader = await this.loading.create({
        message: "Loading...",
        spinner: "crescent",
      });
      await loader.present();
      this.dataService
        .getWithId(Endpoints.History, this.sharedService.patientId)
        .pipe(
          finalize(() => {
            loader.dismiss();
            this.IsLoading = false;
          })
        )
        .subscribe((res: any[]) => {
          console.log("🚀 ~ file: glasses.page.ts ~ line 64 ~ HistoryPage ~ .subscribe ~ res", res)
          if (res && res.length > 0) {
            this.Histories = res.map((element) => ({
              DoctorName: element.doctorName,
              VisitDate: element.date,
              Service: element.serviceName,
              EyeTypeName: element.eyeTypeName,
              Contract: element.contractName,
              Branch: element.branchName,
              Cost: element.cost
            })).sort((val1, val2)=> {return new Date(val2.VisitDate).valueOf() - new 
              Date(val1.VisitDate).valueOf()});
            console.log(
              "🚀 ~ file: home.page.ts ~ line 26 ~ HomePage ~ ngOnInit ~ this.Histories",
              this.Histories
            );
          }
        });
    }
  }

  openDetails(item:History){
    localStorage.setItem("historyDetails",JSON.stringify(item));
    this.router.navigate(['/tabs/history/voucher']);
  }
}
