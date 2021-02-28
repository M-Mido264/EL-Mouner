import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { SharedService } from 'src/app/services/shared.service';
import { Storage } from '@ionic/storage';
import { MustMatch } from 'src/app/services/must.match';
import { Endpoints } from 'src/app/services/api.endpoints';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [Keyboard]
})
export class RegisterPage implements OnInit {
  public regForm: FormGroup;
  isSigned: boolean = false;
  PatientChecked = false;
  constructor(
    public keyboard: Keyboard,
    public _FormBuilder: FormBuilder ,
    private dataService: DataService ,
    public loading: LoadingController , 
    private router: Router,
    private storage: Storage,
    public sharedService: SharedService,
    private alertController: AlertController,
    private toastCtrl: ToastController) 
    {
      this.regForm = this._FormBuilder.group({ // username => email
        UserName: ['', Validators.compose([Validators.required, Validators.pattern("[a-z0-9.-_]{1,}@[a-z.-]{2,}[.]{1}[a-z]{2,4}")] )],
        Mobile: ['', Validators.compose([Validators.required , Validators.minLength(11), Validators.maxLength(11)])],
        PatientNo: [null],
        PatientCheckedForm: [''],
        Password: ['', Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(12)])],
        ConfirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(12)])]
      }, {
        validator: MustMatch('Password', 'ConfirmPassword')
      });
    }

 

  ngOnInit() {
  }

  getInput(input): AbstractControl {
    return this.regForm.controls[input];
  }
  
  async register(){
    this.isSigned = true;
    if(this.regForm.valid){
      let loader = await this.loading.create({
        message: 'Loading...',
        spinner: 'crescent'
      });
      await loader.present();
      if (this.regForm.touched && this.regForm.valid) {
        var obj = {
          UserName: this.regForm.value.UserName,
          Password: this.regForm.value.Password,
          Mobile: this.regForm.value.Mobile,
          PatientNo: this.regForm.value.PatientNo
        }
        console.log(JSON.stringify(obj));
        this.dataService.post(Endpoints.register, obj).subscribe((res: any) => {
        console.log("RegisterPage -> register -> res", res)
          if (res.id) {
            this.regForm.reset();
            this.router.navigate(['/login']);
          }
          loader.dismiss();
        }, err => {
          if (err.error.message === 'An already existing user with this email, If you forgot password Please click forgot password to reset it' 
          ||err.error.message === 'An already existing user with this mobile number, If you already have an account please login with'
          ||err.error.message === 'Incorrect patient number ,Please insert the right one') {
          this.createEnAlert(err.error.message)
          loader.dismiss();
          } else {
            console.log(err)
            this.presentError();
            loader.dismiss();
          }
        });
      }
    }
    
  }
  async presentError(){
    let toast = this.toastCtrl.create({
      message: "Check Network",
      duration: 3000,
      position: "top"
    });
    (await toast).present();
  }
  createEnAlert(message: string) {
    this.alertController.create({
      subHeader: 'Error',
      message: message,
      buttons: [
        'Ok'
      ]
    }).then((alert) => {
      alert.present();
    });
  }

  toggleChange(){
    console.log("RegisterPage -> toggleChange -> this.PatientChecked", this.PatientChecked)
    if(!this.PatientChecked){
      this.PatientChecked = false;
      this.regForm.get('PatientNo').clearValidators();
      this.regForm.get('PatientNo').updateValueAndValidity();
    }else{
      this.PatientChecked = true;
      this.regForm.get('PatientNo').setValidators(Validators.required);
    }
  }
  
}
