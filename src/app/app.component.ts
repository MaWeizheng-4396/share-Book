import { Component, ViewChild } from '@angular/core';
import { Platform, ToastController, Nav, IonicApp } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage: any = LoginPage;
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  @ViewChild('myNav') nav: Nav;

  constructor(public ionicApp: IonicApp, public platform: Platform, public toastCtrl: ToastController) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.registerBackButtonAction();//注册返回按键事件
    });
  }
  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      this.ionicApp._toastPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive()
      let activePortal = this.ionicApp._modalPortal.getActive();
      if (activePortal) {
        activePortal.dismiss().catch(() => { });
        activePortal.onDidDismiss(() => { });
        return;
      }
      let activeVC = this.nav.getActive();
      let tabs = activeVC.instance.tabs;
      let activeNav = tabs.getSelected();
      return activeNav.canGoBack() ? activeNav.pop() : this.showExit()
    }, 1);
  }

  //双击退出提示框
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'top'
      }).present();
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }
}
