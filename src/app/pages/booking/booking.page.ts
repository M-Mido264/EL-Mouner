import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Booking } from 'src/app/models/Booking';
import { Endpoints } from 'src/app/services/api.endpoints';
import { DataService } from 'src/app/services/data.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: "app-booking",
  templateUrl: "./booking.page.html",
  styleUrls: ["./booking.page.scss"],
})
export class BookingPage implements OnInit {
  backButtonSubscription;
  Reservations: Booking[] = [];
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
        this.router.navigate(["/tabs"]);
      }
    );
    this.getData();
  }
  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  ngOnInit() {}

  openAdding() {
    console.log("add");
    this.router.navigate(["/booking/add-edit-booking"]);
  }

  async getData() {
    this.Reservations = [];
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
        .getWithId(Endpoints.Reservation, this.sharedService.patientId)
        .pipe(
          finalize(() => {
            loader.dismiss();
            this.IsLoading = false;
          })
        )
        .subscribe((res: any[]) => {
          console.log(
            "🚀 ~ file: booking.page.ts ~ line 64 ~ BookingPage ~ .subscribe ~ res",
            res
          );
          if (res && res.length > 0) {
            this.Reservations = res
              .map((element) => ({
                Id: element.id,
                GroupId: element.groupId,
                ReservationDate: element.reservationDate,
                ServiceId: element.serviceId,
                DoctorId: element.doctorId,
                ViaMobileApp: true,
                EyeType: element.eyeType,
                BranchId: element.branchId,
                Come: false,
                PatientId: this.sharedService.patientId,
                CreatedDt: element.createdDt,
                DoctorName: element.doctorNameEn
              }))
              .sort((val1, val2) => {
                return (
                  new Date(val2.ReservationDate).valueOf() -
                  new Date(val1.ReservationDate).valueOf()
                );
              });
            console.log(
              "🚀 ~ file: booking.page.ts ~ line 26 ~ BookingPage ~ ngOnInit ~ this.Reservations",
              this.Reservations
            );
          }
        });
    }
  }

  openDetails(item: Booking) {
    localStorage.setItem("bookingObject", JSON.stringify(item));
    this.router.navigate(["/booking/add-edit-booking"]);
  }
}
