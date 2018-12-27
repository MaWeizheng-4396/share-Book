import { Component } from '@angular/core';
import { HttpApi } from "../../../app/service/http-api.service";
import { ToastController } from "ionic-angular";
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-select-details',
  templateUrl: 'select-details.html',
})
export class SelectDetailsPage {

  wordData = [];
  paramsData = [];
  window: Window;
  cnm1 = '';
  cnm2 = '';
  cnm3 = '';
  appointData: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private httpApi: HttpApi) {
    this.paramsData = this.navParams.data;
    console.log(this.paramsData);
  }
  private showWarnAlert(position: string, warnMessage: string) {
    let toast = this.toastCtrl.create({
      message: warnMessage,
      duration: 3000,
      position: position
    });
    toast.present(toast);
  }

  ionViewWillLoad() {
    this.httpApi.get<any>('appointSelect/appointSelect?imgname=' + this.paramsData).subscribe(data => {
      let result = data;
      console.log(result);
      if (result[0] !== null) {
        this.wordData = result[0];
        this.cnm1 = result[0].imgname;
        this.cnm2 = result[0].idusers;
        this.cnm3 = result[0].iditems;
      } else {
        this.showWarnAlert('bottom', '暂时没有数据');
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectDetailsPage');
  }
  appiontClick() {
    this.httpApi.get<any>('appointSelect/insertAppoint?appointuname=' + window.localStorage.username + '&imgId=' +
      this.cnm3 + '&userId=' + this.cnm2)
      .subscribe(
        data => {
          console.log(data.code);
          if (data.code == 200) {
            this.showWarnAlert('bottom', '预约成功');
            this.appointData = false;
          } else {
            this.showWarnAlert('bottom', '预约失败，请稍后重试');
          }
        });
  }
}
