import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpApi } from "../../../app/service/http-api.service";
import { InformationPage } from "../../home/information/information";

@Component({
  selector: 'page-download',
  templateUrl: 'download.html',
})
export class DownloadPage {
  downLoadData: any;
  window: Window;
  imgName = [];
  InformationPage;
  downloadData: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpApi: HttpApi) {
    this.InformationPage = InformationPage;
  }

  ionViewDidLoad() {
    console.log(window.localStorage.id);
    console.log('ionViewDidLoad DownloadPage');
    this.httpApi.get<any>('downSelect/downSelect?idusers=' + window.localStorage.id).subscribe(
      data => {
        console.log(data);
        if (data.length > 0) {
          this.downloadData = false;
          this.downLoadData = data;
          for (const key in data) {
            this.imgName.push(data[key].imgname);
          }
        } else {
          this.downloadData = true;
          console.log('cnm');
        }
      });
  }
  downSelectClick(i) {
    this.navCtrl.push(InformationPage, this.imgName[i]);
  }

}
