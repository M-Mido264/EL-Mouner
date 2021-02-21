import { DatePipe } from "@angular/common";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingController, Platform, ToastController } from "@ionic/angular";
import { finalize } from "rxjs/operators";
import { Booking } from "src/app/models/Booking";
import { Lookups } from "src/app/models/Lookups";
import { NewPatientBooking } from "src/app/models/NewPatientBooking";
import { Endpoints } from "src/app/services/api.endpoints";
import { DataService } from "src/app/services/data.service";
import { SharedService } from "src/app/services/shared.service";

@Component({
  selector: "app-add-edit-booking",
  templateUrl: "./add-edit-booking.page.html",
  styleUrls: ["./add-edit-booking.page.scss"],
  providers: [DatePipe],
})
export class AddEditBookingPage implements OnInit, AfterViewInit {
  selectedBooking: Booking;
  minDate: string;
  maxDate: string;
  minDateForDOB: string;
  maxDateForDOB: string;
  Booking: Booking = new Booking();
  NewPatientBooking: NewPatientBooking = new NewPatientBooking();
  Form: FormGroup;
  NewPatientForm: FormGroup;
  isTouched: Boolean = false;
  Services: Lookups[] = [];
  Groups: Lookups[] = [];
  Doctors: Lookups[] = [];
  Branches: Lookups[] = [];
  ShowEyeType: Boolean = true;
  backButtonSubscription;
  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    public sharedService: SharedService,
    private dataService: DataService,
    public loading: LoadingController,
    private router: Router,
    private platefrom: Platform,
    private toastCtrl: ToastController
  ) {
    this.Form = new FormGroup({
      GroupId: new FormControl(null, [Validators.required]),
      ServiceId: new FormControl(null, [Validators.required]),
      DoctorId: new FormControl(null, [Validators.required]),
      BranchId: new FormControl(null, [Validators.required]),
      ReservationDate: new FormControl(null, [Validators.required]),
      EyeType: new FormControl(null, [Validators.required]),
    });

    this.NewPatientForm = new FormGroup({
      GroupId: new FormControl(null, [Validators.required]),
      ServiceId: new FormControl(null, [Validators.required]),
      DoctorId: new FormControl(null, [Validators.required]),
      BranchId: new FormControl(null, [Validators.required]),
      ReservationDate: new FormControl(null, [Validators.required]),
      EyeType: new FormControl(null, [Validators.required]),
      FNameAr: new FormControl(null, [Validators.required]),
      MiddleNameAr: new FormControl(null, [Validators.required]),
      LastnameAr: new FormControl(null, [Validators.required]),
      DOB: new FormControl(null, [Validators.required]),
      Mobile: new FormControl(null, Validators.compose([Validators.required , Validators.minLength(10), Validators.maxLength(20)])),
      Gender: new FormControl(null, [Validators.required]),
    });
    this.route.url.subscribe((res) => {
      const obj = localStorage.getItem("bookingObject");
      this.selectedBooking = JSON.parse(obj);
      console.log(
        "🚀 ~ file: editbooking.page.ts ~ line 24 ~ editbooking ~ ionViewWillEnter ~ this.selectedBooking",
        this.selectedBooking
      );
    });
  }

  ionViewWillEnter() {
    this.backButtonSubscription = this.platefrom.backButton.subscribeWithPriority(
      1,
      async () => {
        this.router.navigate(["/booking"]);
        localStorage.removeItem("bookingObject");
      }
    );
    this.minDate = this.datePipe.transform(new Date(), "yyy-MM-dd");
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 10)),
      "yyy-MM-dd"
    );
    this.maxDateForDOB = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() - 5)),
      "yyy-MM-dd"
    );
    this.minDateForDOB  = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() - 100)),
      "yyy-MM-dd"
    );
  }


  WithoutTime(dateTime:Date) {
    var date = new Date(new Date(dateTime).getTime());
    date.setHours(0, 0, 0, 0);
    return date;
  }

  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  ngOnInit() {
    //Groups
    this.dataService.get(Endpoints.Groups).subscribe((res: any[]) => {
      if (res) {
        this.Groups = res.map((element) => ({
          Id: element.id,
          NameAr: element.nameAr,
          NameEn: element.nameEn,
          Code: null
        }));
      }
    });
    //Doctors
    this.dataService.get(Endpoints.Doctors).subscribe((res: any[]) => {
      if (res) {
        this.Doctors = res.map((element) => ({
          Id: element.id,
          NameAr: element.nameAr,
          NameEn: element.nameEn,
          Code: null
        }));
      }
    });
    //Branches
    this.dataService.get(Endpoints.Branches).subscribe((res: any[]) => {
      if (res) {
        this.Branches = res.map((element) => ({
          Id: element.id,
          NameAr: element.nameAr,
          NameEn: element.nameEn,
          Code: element.code
        }));
      }
    });
  }

  ngAfterViewInit(): void {
    if(!this.sharedService.patientId || this.sharedService.patientId == 'null'){
      this.NewPatientForm.controls['Mobile'].setValue(this.sharedService.mobile || null)
    }
    if (this.selectedBooking) {
      setTimeout(() => {
        this.setBookingFormValues(this.selectedBooking);
      }, 500);
    }
  }

  getInput(input: string) {
    if(!this.sharedService.patientId || this.sharedService.patientId == 'null'){
      return this.NewPatientForm.controls[input];
    }
    return this.Form.controls[input];
  }

  GroupChange(ID: any) {
    console.log(
      "🚀 ~ file: add-edit-booking.page.ts ~ line 92 ~ AddEditBookingPage ~ GroupChange ~ ID",
      ID
    );
    if (ID) {
      if (ID === "eb7387a2-17c8-4c45-ad02-eb313d36292b") {
        this.ShowEyeType = false;
        this.Form.controls["EyeType"].setValue("3" || null);
        this.Form.get("EyeType").clearValidators();
        this.Form.get("EyeType").updateValueAndValidity();
      } else {
        this.ShowEyeType = true;
        this.Form.get("EyeType").setValidators(Validators.required);
      }
      this.Services = [];
      this.dataService
        .getWithId(Endpoints.Services, ID)
        .subscribe((res: any[]) => {
          if (res) {
            this.Services = res.map((element) => ({
              Id: element.id,
              NameAr: element.nameAr,
              NameEn: element.nameEn,
              Code: null
            }));
            console.log(
              "🚀 ~ file: add-edit-booking.page.ts ~ line 150 ~ AddEditBookingPage ~ this.Services=res.map ~ this.Services",
              this.Services
            );
            if (this.selectedBooking) {
              console.log("service");
              this.Form.controls["ServiceId"].setValue(
                this.selectedBooking.ServiceId
              );
              console.log("after set", this.Form.value.ServiceId);
            }
          }
        });
    }
  }

  async save() {
    this.isTouched = true;
    if (this.Form.valid) {
      const loader = await this.loading.create({
        message: "Loading...",
        spinner: "crescent",
      });
      await loader.present();
      this.Booking.BranchId = this.Form.value.BranchId;
      this.Booking.DoctorId = this.Form.value.DoctorId;
      this.Booking.EyeType = parseInt(this.Form.value.EyeType);
      this.Booking.GroupId = this.Form.value.GroupId;
      this.Booking.ServiceId = this.Form.value.ServiceId;
      this.Booking.ReservationDate = this.WithoutTime(this.Form.value.ReservationDate);
      this.Booking.PatientId = this.sharedService.patientId;
      console.log(
        "🚀 ~ file: add-edit-booking.page.ts ~ line 60 ~ AddEditBookingPage ~ save ~ this.Booking",
        this.Booking
      );

      if (!this.selectedBooking) {
        // adding
        this.dataService
          .post(Endpoints.Booking, this.Booking)
          .pipe(
            finalize(() => {
              loader.dismiss();
            })
          )
          .subscribe(
            (res) => {
              console.log(
                "🚀 ~ file: add-edit-booking.page.ts ~ line 147 ~ AddEditBookingPage ~ save ~ res",
                res
              );
              this.isTouched = false;
              localStorage.removeItem("bookingObject");
              this.router.navigate(["booking"]);
            },
            (err) => {
              this.isTouched = false;
              // show toaster
              this.presentError();
              console.log(
                "🚀 ~ file: add-edit-booking.page.ts ~ line 152 ~ AddEditBookingPage ~ save ~ err",
                err
              );
            }
          );
      } else {
        // editing
        this.Booking.Id = this.selectedBooking.Id;
        console.log(
          "🚀 ~ file: add-edit-booking.page.ts ~ line 212 ~ AddEditBookingPage ~ save-edit ~ this.Booking",
          this.Booking
        );
        this.dataService
          .secure_Update(Endpoints.EditBooking, this.Booking)
          .pipe(
            finalize(() => {
              loader.dismiss();
            })
          )
          .subscribe(
            (res) => {
              console.log(
                "🚀 ~ file: add-edit-booking.page.ts ~ line 147 ~ AddEditBookingPage ~ save ~ res",
                res
              );
              this.isTouched = false;
              localStorage.removeItem("bookingObject");
              this.router.navigate(["booking"]);
            },
            (err) => {
              this.isTouched = false;
              // show toaster
              this.presentError();
              console.log(
                "🚀 ~ file: add-edit-booking.page.ts ~ line 152 ~ AddEditBookingPage ~ save ~ err",
                err
              );
            }
          );
      }
    }
  }

  async saveNwePatient() {
    this.isTouched = true;
    if (this.NewPatientForm.valid) {
      const loader = await this.loading.create({
        message: "Loading...",
        spinner: "crescent",
      });
      await loader.present();
      this.NewPatientBooking.BranchId = this.NewPatientForm.value.BranchId;
      this.NewPatientBooking.DoctorId = this.NewPatientForm.value.DoctorId;
      this.NewPatientBooking.EyeType = parseInt(this.NewPatientForm.value.EyeType);
      this.NewPatientBooking.GroupId = this.NewPatientForm.value.GroupId;
      this.NewPatientBooking.ServiceId = this.NewPatientForm.value.ServiceId;
      this.NewPatientBooking.DOB = this.WithoutTime(this.NewPatientForm.value.DOB);
      this.NewPatientBooking.ReservationDate = this.WithoutTime(this.NewPatientForm.value.ReservationDate);
      this.NewPatientBooking.FNameAr = this.NewPatientForm.value.FNameAr;
      this.NewPatientBooking.Gender = this.NewPatientForm.value.Gender;
      this.NewPatientBooking.LastnameAr = this.NewPatientForm.value.LastnameAr;
      this.NewPatientBooking.MiddleNameAr = this.NewPatientForm.value.MiddleNameAr;
      this.NewPatientBooking.Mobile = this.NewPatientForm.value.Mobile.toString();
      this.NewPatientBooking.UserId = this.sharedService.userId;
      this.NewPatientBooking.BranchNumber = this.Branches.find(x=>x.Id == this.NewPatientForm.value.BranchId).Code;
      console.log("🚀 ~ file: add-edit-booking.page.ts ~ line 300 ~ AddEditBookingPage ~ saveNwePatient ~ this.NewPatientBooking",this.NewPatientBooking)
      // adding
      this.dataService
        .post(Endpoints.BookingForNewPatient, this.NewPatientBooking)
        .pipe(
          finalize(() => {
            loader.dismiss();
          })
        )
        .subscribe(
          (res) => {
          console.log("🚀 ~ file: add-edit-booking.page.ts ~ line 300 ~ AddEditBookingPage ~ saveNwePatient ~ res", res)
            this.isTouched = false;
            localStorage.removeItem("bookingObject");
            this.router.navigate(["booking"]);
          },
          (err) => {
          console.log("🚀 ~ file: add-edit-booking.page.ts ~ line 306 ~ AddEditBookingPage ~ saveNwePatient ~ err", err)
            this.isTouched = false;
            // show toaster
            if(err.error == "من فضلك ادخل تاريخ مستقبلي"){
               this.presentErrorMessage();
            }else{
              this.presentError();
            }            
          }
        );
    }
  }

  setBookingFormValues(values: Booking) {
    console.log("onSet");
    this.Form.controls["BranchId"].setValue(values.BranchId || null);
    this.Form.controls["DoctorId"].setValue(values.DoctorId || null);
    this.Form.controls["EyeType"].setValue(values.EyeType.toString() || null);
    this.Form.controls["GroupId"].setValue(values.GroupId || null);
    this.Form.controls["ReservationDate"].setValue(
      values.ReservationDate || null
    );
    //this.Form.controls["ServiceId"].setValue(values.ServiceId || null);
  }

  async presentError() {
    let toast = this.toastCtrl.create({
      message: "Server error, please try again later!",
      duration: 3000,
      position: "top",
    });
    (await toast).present();
  }

  async presentErrorMessage(){
    let toast = this.toastCtrl.create({
      message: "Please choose future date",
      duration: 3000,
      position: "top",
    });
    (await toast).present();
  }
}
