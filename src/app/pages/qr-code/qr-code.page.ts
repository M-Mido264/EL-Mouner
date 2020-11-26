import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

const options: BarcodeScannerOptions = {
  preferFrontCamera: false,
  showFlipCameraButton: true,
  showTorchButton: true,
  torchOn: false,
  prompt: 'Place a barcode inside the scan area',
  resultDisplayDuration: 500,
  formats: 'EAN_13,EAN_8,QR_CODE,PDF_417',
  orientation: 'portrait',
};

@Component({
  selector: "app-qr-code",
  templateUrl: "./qr-code.page.html",
  styleUrls: ["./qr-code.page.scss"],
  providers: [BarcodeScanner],
})
export class QrCodePage implements OnInit {
  scanedCode = null;
  qrCode: any;
  backButtonSubscription;
  inputData: string;
  encodedData: any;

  constructor(
    private platform: Platform,
    private router: Router,
    private barcodeScanner: BarcodeScanner
  ) {}

  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(
      1,
      async () => {
        this.router.navigate(["/tabs"]);
      }
    );
  }
  ionViewDidLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  ngOnInit() {}

  scan() {
    this.barcodeScanner
      .scan(options)
      .then((barcodeData) => {
        console.log("Barcode data", barcodeData);
        this.scanedCode = barcodeData;
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  createBarcode() {
    this.barcodeScanner
      .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.inputData)
      .then(
        (encodedData) => {
          console.log(encodedData);
          this.encodedData = encodedData;
        },
        (err) => {
          console.log("Error occured : " + err);
        }
      );
  }
}
