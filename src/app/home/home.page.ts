import { Component, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { ArticlesOrNews } from '../models/ArticlesOrNews';
import { Endpoints, Storage_URL } from '../services/api.endpoints';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  show:Boolean = false;
  segment :string = 'ARTICLES';
  backButtonSubscription;
  Articles: ArticlesOrNews[]=[]
  News: ArticlesOrNews[]=[]
  photoPath:string
  constructor(private platefrom: Platform,private alertController: AlertController,private dataService: DataService) {
    this.photoPath = Storage_URL
  }
  
  
  ngOnInit(): void {
    this.dataService.get(Endpoints.ArticlesAndNews).subscribe((res:any[])=>{
       if(res && res.length > 0){
           this.Articles = res.filter(x=>x.kind == true).map((element)=>({
              Body : element.body,
              HasNewPhoto : element.hasNewPhoto,
              Id:element.id,
              Kind: element.kind,
              Photo: element.photo,
              Title: element.title,
              Visible: false
           }));
           console.log("🚀 ~ file: home.page.ts ~ line 26 ~ HomePage ~ ngOnInit ~ this.Articles", this.Articles)
           this.News = res.filter(x=>x.kind == false).map((element)=>({
              Body : element.body,
              HasNewPhoto : element.hasNewPhoto,
              Id:element.id,
              Kind: element.kind,
              Photo: element.photo,
              Title: element.title,
              Visible: false
           }));
           console.log("🚀 ~ file: home.page.ts ~ line 35 ~ HomePage ~ ngOnInit ~ this.News", this.News)
       }
    });
  }

  showHideSearchBar(){
    this.show = !this.show;
  }
  ionViewDidEnter() {
    this.backButtonSubscription = this.platefrom.backButton.subscribeWithPriority(0,
      async () => {
        this.closeApp();
        //navigator["app"].exitApp();
      }
    );
  }
  ionViewWillLeave() {
    this.backButtonSubscription.unsubscribe();
  }

  async closeApp() {
    const alert = await this.alertController.create({
      header: "Cnfirmation",
      message: "Do you want realy close the app",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            alert.dismiss();
          }
        },
        {
          text: "Ok",
          handler: () => {
            navigator["app"].exitApp();
          }
        }
      ]
    });

    alert.present();
  }
}


