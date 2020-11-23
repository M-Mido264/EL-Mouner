import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
  providers:[QRScanner]
})
export class QrCodePage implements OnInit {
  scanedCode =null;
  qrCode:any;
  backButtonSubscription
  constructor(private qrScanner: QRScanner,private platform:Platform,private router:Router) 
  {
  //  this.platform.backButton.subscribeWithPriority(0,()=>{
  //   document.getElementsByTagName("body")[0].style.opacity = "1";
  //   this.qrCode.unsubscribe();
  //  })
   }

   ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(1,
      async () => {
        this.router.navigate(["/tabs"]);
      }
    );
  }
  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  ngOnInit() {
  }

  scan(){
    this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
       // camera permission was granted
       console.log("QrCodePage -> scan -> status -> authorized", status)
      //  document.getElementsByTagName("body")[0].style.opacity = "0";
       // start scanning
       this.qrCode = this.qrScanner.scan().subscribe(
         (text: string) => {
           console.log("Scanned something", text);
          //  document.getElementsByTagName("body")[0].style.opacity = "1";
           this.qrScanner.hide(); // hide camera preview
           this.qrCode.unsubscribe(); // stop scanning
           this.scanedCode = text;
         },
         (err) => {
           console.log("QrCodePage -> scan -> err", err);
         }
       );

     } else if (status.denied) {
       console.log("QrCodePage -> scan -> status -> denied", status)
       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
     } else {
      console.log("QrCodePage -> scan -> status", status)
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => console.log('Error is', e));
  }

}
