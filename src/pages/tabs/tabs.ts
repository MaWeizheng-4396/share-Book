import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {Events, LoadingController, NavController} from "ionic-angular";
import {LoginPage} from "../login/login";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(private nav: NavController,
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private events: Events) {

  }
  ionViewDidLoad() {
    this.looutListenEvents();
    this.userCheckListenEvents();
  }

  ionViewWillUnload() {
    this.events.unsubscribe('toLogin');
    this.events.unsubscribe('userCheck');
  }

  looutListenEvents() {
    this.events.subscribe('toLogin', () => {
      console.log('aaa');
      this.navCtrl.pop();
      // this.nav.setRoot(LoginPage);
      // this.nav.pop(); 使用这种方式也可以，但是会在登录框中默认填上值
    });
  }

  userCheckListenEvents() {
    this.events.subscribe('userCheck', () => {
        let loader = this.loadingCtrl.create({
          content: "链接超时，正在返回登录页",
          duration: 3000
        });
        loader.present();
        loader.onDidDismiss(() => {
          this.nav.setRoot(LoginPage);
        });

    });
  }
}
