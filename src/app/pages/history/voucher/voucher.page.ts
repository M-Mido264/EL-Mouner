import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { History } from 'src/app/models/History';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: "app-voucher",
  templateUrl: "./voucher.page.html",
  styleUrls: ["./voucher.page.scss"],
})
export class VoucherPage implements OnInit {
  History: History = new History();
  constructor(
    public sharedService: SharedService
  ) {}

  ionViewWillEnter() {
    const obj = localStorage.getItem("historyDetails");
    this.History = JSON.parse(obj);
    console.log(
      "🚀 ~ file: voucher.page.ts ~ line 24 ~ VoucherPage ~ ionViewWillEnter ~ this.History",
      this.History
    );
  }

  ngOnInit() {}
}
