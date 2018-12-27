import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage} from '../login/login';
import { OwnPage } from "../about/own/own";
import { MyMessagePage } from "../about/my-message/my-message";
import { MyVersionPage } from "../about/my-version/my-version";
import { AppAboutPage } from "../about/app-about/app-about";
import { DownloadPage } from "./download/download";
import { AppointPage } from "./appoint/appoint";
import { MyApp } from '../../app/app.component';
// import { ModalController } from 'ionic-angular';
// import { ModalPage } from './modal-page';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  ownPage;
  loginPage;
  appAbout;
  MyApp;
  MyMessagePage;
  DownloadPage;
  AppointPage;
  downData;
  MyVersionPage;
  window: Window;
  constructor(public navCtrl: NavController) {
    this.ownPage = OwnPage;
    this.MyApp = MyApp;
    this.loginPage= LoginPage;
    this.appAbout = AppAboutPage;
    this.MyMessagePage = MyMessagePage;
    this.MyVersionPage =MyVersionPage;
    this.DownloadPage = DownloadPage;
    this.AppointPage = AppointPage;
    this.downData={name: 'mwz'};
  }
    //通过代码的方式跳转
    pushMorePage(){
      console.log("代码方式跳转");
      //跳转到指定页面
      this.navCtrl.push(OwnPage, window.localStorage.username);
    }
    logOut(){
      window.localStorage.clear;
      location.reload();
      this.navCtrl.push(MyApp);
    }
    myMessagePage(){
      this.navCtrl.push(MyMessagePage, window.localStorage.username)
    }
}
