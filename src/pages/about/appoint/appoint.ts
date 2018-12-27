import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpApi } from "../../../app/service/http-api.service";
import { InformationPage } from "../../home/information/information";

@Component({
  selector: 'page-appoint',
  templateUrl: 'appoint.html',
})
export class AppointPage {
  downLoadData: any;
  window: Window;
  imgName = [];
  InformationPage;
  appointData: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpApi: HttpApi) {
    this.InformationPage = InformationPage;
  }

  ionViewDidLoad() {
    console.log(window.localStorage.id);
    console.log('ionViewDidLoad AppointPage');
    this.httpApi.get<any>('appointOwnSelect/appointSelect?userid=' + window.localStorage.id).subscribe(
      data => {
        console.log(data);
        if (data.length > 0) {
          this.appointData = false;
          this.downLoadData = data;
          for (const key in data) {
            this.imgName.push(data[key].imgname);
          }
        } else {
          this.appointData = true;
          console.log('cnm');
        }
      });
  }
  downSelectClick(i) {
    this.navCtrl.push(InformationPage, this.imgName[i]);
  }
}
