import { Injectable } from '@angular/core';
// import { ErrorDialogService } from './errordialog.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { SharedService } from './shared.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    public alertCtrl: AlertController,
    private sharedService: SharedService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log("event--->>>", event);
          // this.errorDialogService.openDialog(event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        //this.handleErrors(error);
        return throwError(error);
      })
    );
  }

  handleErrors(error) {
    if (error.status === 400) {
      this.createAlert("Please check your entry data.");
    } else if (error.status === 900) {
      this.createAlert("You are not authorized.");
    } else if (error.status === 404) {
      this.createAlert("Not Found");
    } else if (error.status === 422) {
      this.createAlert("Data Entered Is Un Correct");
    } else if (error.status === 401) {
      this.createAlert("Un Authorized");
    } else if (error.status === 500) {
      this.createAlert("Server Error");
    } else {
      this.createAlert("UnKnown Error");
    }
  }

  createAlert(message) {
    this.alertCtrl
      .create({
        subHeader: "Error.",
        message,
        buttons: ["OK"],
      })
      .then((alert) => {
        alert.present();
      });
  }
}
