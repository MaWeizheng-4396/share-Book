import { Component } from '@angular/core';
import { HttpApi } from "../../../app/service/http-api.service";
import { ToastController } from "ionic-angular";
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-own',
  templateUrl: 'own.html',
})
export class OwnPage {
  ownSelect: any = {};
  name: any = '';
  readonlyOn: boolean = true;
  isSelected: boolean = true;
  userSelect: boolean = true;
  window: Window;
  constructor(public navCtrl: NavController, private httpApi: HttpApi, public navParams: NavParams,
    public toastCtrl: ToastController ) {
    this.name = this.navParams.data;
    console.log(this.name);
  }

  ionViewWillLoad() {
    this.ownSelect = {};
    console.log(this.name);
    console.log(window.localStorage.username);
    console.log(this.name === window.localStorage.username);
    if (this.name === window.localStorage.username) {
      this.userSelect = false;
      this.httpApi.get<any>('ownselect/ownselect?usersname=' + window.localStorage.username)
      .subscribe(
        data => {
          let result = data;
          console.log(result);
          this.ownSelect = result[0];
          // console.log(this.ownSelect);
        });
    } else {
      this.userSelect = true;
      this.httpApi.get<any>('ownselect/ownselect?usersname=' + this.name)
      .subscribe(
        data => {
          let result = data;
          // console.log(result);
          this.ownSelect = result[0];
          // console.log(this.ownSelect);
        });
    }

  }
  // 底部提示
  private showWarnAlert(position: string, warnMessage: string) {
    let toast = this.toastCtrl.create({
      message: warnMessage,
      duration: 3000,
      position: position
    });
    toast.present(toast);
  }
  updataClick(event) {
    this.readonlyOn = false;
    this.isSelected = false;
  }
  updata1Click(event) {
    this.httpApi.get<any>('login/updata?idusers=' + this.ownSelect.idusers + '&users_tel=' + this.ownSelect.users_tel + '&users_email=' + this.ownSelect.users_email)
      .subscribe(
        data => {
          let result = data;
          if (result == 200) {
            this.isSelected = true;
            this.navCtrl.push(OwnPage, window.localStorage.usersname);
            this.showWarnAlert('bottom', 'ok');
          } else if (result == 250) {
            this.navCtrl.push(OwnPage, window.localStorage.usersname);
            this.showWarnAlert('bottom', '修改错误请重试');
          } else {
            this.showWarnAlert('bottom', '由于网络或其他原因导致出错,请重试');
          }
        });
  }

}
