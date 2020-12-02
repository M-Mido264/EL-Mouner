import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { element } from 'protractor';
import { finalize } from 'rxjs/operators';
import { Medicine } from 'src/app/models/Medicine';
import { Endpoints } from 'src/app/services/api.endpoints';
import { DataService } from 'src/app/services/data.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: "app-medicine",
  templateUrl: "./medicine.page.html",
  styleUrls: ["./medicine.page.scss"],
})
export class MedicinePage implements OnInit {
  backButtonSubscription;
  IsLoading: Boolean = false;
  Medicines: Medicine[] = [];
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
        this.router.navigate(["/tabs"]);
      }
    );
    this.getData();
  }
  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  ngOnInit() {}

  async getData() {
    this.Medicines = [];
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
        .getWithId(Endpoints.Medicine, this.sharedService.patientId)
        .pipe(
          finalize(() => {
            loader.dismiss();
            this.IsLoading = false;
          })
        )
        .subscribe((res: any[]) => {
          console.log("🚀 ~ file: medicine.page.ts ~ line 64 ~ MedicinePage ~ .subscribe ~ res", res)
          if (res && res.length > 0) {
            this.Medicines = res.map((element)=> ({
               DoctorName: element.doctorName,
               Date: element.date,
               MedName: element.medName,
               Usages: element.usages,
               Remarks: element.remarks,
               EyeTypeName: element.eyeTypeName,
               ServiceName: element.serviceName
            })).sort((val1, val2)=> {return new Date(val2.Date).valueOf() - new 
              Date(val1.Date).valueOf()});
            console.log(
              "🚀 ~ file: medicine.page.ts ~ line 26 ~ MedicinePage ~ ngOnInit ~ this.Medicines",
              this.Medicines
            );
          }
        });
    }
  }

  openDetails(item:Medicine){
    localStorage.setItem("medicineDetails",JSON.stringify(item));
    this.router.navigate(['/tabs/medicine/medicine-detail']);
  }
}
