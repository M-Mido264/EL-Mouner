import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoadingController, Platform } from "@ionic/angular";
import { finalize } from "rxjs/operators";
import { Glasses } from "src/app/models/Glasses";
import { Visit } from 'src/app/models/Visit';
import { Endpoints } from "src/app/services/api.endpoints";
import { DataService } from "src/app/services/data.service";
import { SharedService } from "src/app/services/shared.service";

@Component({
  selector: "app-glasses",
  templateUrl: "./glasses.page.html",
  styleUrls: ["./glasses.page.scss"],
})
export class GlassesPage implements OnInit {
  backButtonSubscription;
  Glasses: Glasses[] = [];
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
        this.router.navigateByUrl("tabs/home");
      }
    );
    this.getData();
  }
  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  ngOnInit() {}

  async getData() {
    this.Glasses = [];
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
        .getWithId(Endpoints.AllVisits, this.sharedService.patientId)
        .pipe(
          finalize(() => {
            loader.dismiss();
            this.IsLoading = false;
          })
        )
        .subscribe((res: any[]) => {
          console.log("🚀 ~ file: glasses.page.ts ~ line 64 ~ GlassesPage ~ .subscribe ~ res", res)
          if (res && res.length > 0) {
            this.Glasses = res.filter(x=>x.basicData != null && ( x.basicData.newGlassODSphere 
              || x.basicData.newGlassODCylinder
              || x.basicData.newGlassODAxis
              || x.basicData.newGlassODVA
              || x.basicData.newGlassOSSphere
              || x.basicData.newGlassOSCylinder
              || x.basicData.newGlassOSAxis
              || x.basicData.newGlassOSVA
              || x.basicData.addODSphere
              || x.basicData.addODVA
              || x.basicData.addOSSphere
              || x.basicData.addOSVA
              || x.basicData.newGlassIPD
              || x.basicData.addOSIPD
              )).map((element) => ({
              Doctor: element.doctor,
              VisitDate: element.createdDt,
              Id: element.id,
              BasicData: element.basicData
            })).sort((val1, val2)=> {return new Date(val2.VisitDate).valueOf() - new 
              Date(val1.VisitDate).valueOf()});
            console.log(
              "🚀 ~ file: home.page.ts ~ line 26 ~ HomePage ~ ngOnInit ~ this.Glasses",
              this.Glasses
            );
          }
        });
    }
  }

  openDetails(item: Glasses) {
    var visit = new Visit();
    visit.doctorName = item.Doctor.nameEn;
    visit.visitDate = item.VisitDate;
    visit.addODSphere = item.BasicData.addODSphere
    visit.addODVA = item.BasicData.addODVA
    visit.addOSIPD = item.BasicData.addOSIPD 
    visit.addOSSphere = item.BasicData.addOSSphere
    visit.addOSVA = item.BasicData.addOSVA
    visit.newGlassIPD = item.BasicData.newGlassIPD
    visit.newGlassODAxis = item.BasicData.newGlassODAxis
    visit.newGlassODCylinder = item.BasicData.newGlassODCylinder
    visit.newGlassODSphere = item.BasicData.newGlassODSphere
    visit.newGlassODVA = item.BasicData.newGlassODVA
    visit.newGlassOSAxis = item.BasicData.newGlassOSAxis
    visit.newGlassOSCylinder = item.BasicData.newGlassOSCylinder
    visit.newGlassOSSphere = item.BasicData.newGlassOSSphere
    visit.newGlassOSVA = item.BasicData.newGlassOSVA
    localStorage.setItem("glassesDetails",JSON.stringify(visit));
    this.router.navigate(["tabs/glasses/optometer"]);
  }
}
