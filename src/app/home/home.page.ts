import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSlides, LoadingController, Platform } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { ArticlesOrNews } from '../models/ArticlesOrNews';
import { Endpoints, Storage_URL } from '../services/api.endpoints';
import { DataService } from '../services/data.service';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  show: Boolean = false;
  segment = 0;
  backButtonSubscription;
  Articles: ArticlesOrNews[] = [];
  News: ArticlesOrNews[] = [];
  photoPath: string;
  IsLoading:Boolean = true;
  @ViewChild("slides", { static: true }) slider: IonSlides;
  constructor(
    private platefrom: Platform,
    private alertController: AlertController,
    private dataService: DataService,
    public loading: LoadingController
  ) {
    this.photoPath = Storage_URL;
  }

  async ngOnInit() {
    const loader = await this.loading.create({
      message:
        "Loading...",
      spinner: "crescent"
    });
    await loader.present();
    this.dataService.get(Endpoints.ArticlesAndNews).pipe(
      finalize(() => {
        loader.dismiss();
        this.IsLoading = false;
      })
    ).subscribe((res: any[]) => {
      if (res && res.length > 0) {
        this.Articles = res
          .filter((x) => x.kind == true)
          .map((element) => ({
            Body: element.body,
            HasNewPhoto: element.hasNewPhoto,
            Id: element.id,
            Kind: element.kind,
            Photo: element.photo,
            Title: element.title,
            Visible: false,
          }));
        console.log(
          "🚀 ~ file: home.page.ts ~ line 26 ~ HomePage ~ ngOnInit ~ this.Articles",
          this.Articles
        );
        this.News = res
          .filter((x) => x.kind == false)
          .map((element) => ({
            Body: element.body,
            HasNewPhoto: element.hasNewPhoto,
            Id: element.id,
            Kind: element.kind,
            Photo: element.photo,
            Title: element.title,
            Visible: false,
          }));
        console.log(
          "🚀 ~ file: home.page.ts ~ line 35 ~ HomePage ~ ngOnInit ~ this.News",
          this.News
        );
      }
    });
  }

  showHideSearchBar() {
    this.show = !this.show;
  }
  ionViewDidEnter() {
    this.backButtonSubscription = this.platefrom.backButton.subscribeWithPriority(
      0,
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
      header: "Confirmation",
      message: "Do you really want to exit the app",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            alert.dismiss();
          },
        },
        {
          text: "Ok",
          handler: () => {
            navigator["app"].exitApp();
          },
        },
      ],
    });

    alert.present();
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }
}


