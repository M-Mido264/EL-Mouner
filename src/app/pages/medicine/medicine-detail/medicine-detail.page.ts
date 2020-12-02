import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/models/Medicine';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-medicine-detail',
  templateUrl: './medicine-detail.page.html',
  styleUrls: ['./medicine-detail.page.scss'],
})
export class MedicineDetailPage implements OnInit {
  Medicine: Medicine = new Medicine();
  constructor(public sharedService: SharedService) { }

  ionViewWillEnter() {
    const obj = localStorage.getItem("medicineDetails");
    this.Medicine = JSON.parse(obj);
    console.log(
      "🚀 ~ file: Medicine.page.ts ~ line 24 ~ MedicinePage ~ ionViewWillEnter ~ this.Medicne",
      this.Medicine
    );
  }

  ngOnInit() {
  }

}
