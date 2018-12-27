import { Component } from '@angular/core';
import { TabsPage } from "../tabs/tabs";
import { NavController } from 'ionic-angular';
import { LoadingController, ToastController } from "ionic-angular";
import { HttpApi } from "../../app/service/http-api.service";
import { RegisterPage } from '../register/register';
// import { HttpHandler } from '@angular/common/http';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  rememberPassword: any;
  tmpName: string;
  tmpPassword: string;
  loader: any;
  userna: any;
  userpw: any;
  window: Window;
  usersid: string;

  private showWarnAlert(position: string, warnMessage: string) {
    let toast = this.toastCtrl.create({
      message: warnMessage,
      duration: 3000,
      position: position
    });
    toast.present(toast);
  }

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private httpApi: HttpApi) {
    this.userna = window.localStorage.getItem("username");
    this.rememberPassword = window.localStorage.getItem("rememberPassword");
    if (this.rememberPassword == "true") {
      this.userpw = window.localStorage.getItem("password");
    } else {
      this.userpw = "";
    }
  }
  login(username: HTMLInputElement, password: HTMLInputElement) {
    if (username.value.length == 0) {
      this.showWarnAlert('bottom', '请输入账号');
    } else if (password.value.length == 0) {
      this.showWarnAlert('bottom', '请输入密码');
    } else {
      this.firstPost(username.value, password.value);
    }
  }
  private loginSuccess(usersname: string, userspwd: string) {
    window.localStorage.setItem('username', usersname);
    window.localStorage.setItem('password', userspwd);
    window.localStorage.setItem('rememberPassword', this.rememberPassword);
    window.localStorage.setItem('id', this.usersid);
    this.navCtrl.push(TabsPage);
  }
  firstPost(username, userspwd) {
    //然后再次请求，数据库查找账户密码
    this.httpApi.get<any>('login/user/login?usersname=' + username + '&userspwd=' + userspwd)
      .subscribe(
        data => {
          console.log(data);
          //显示结果
          if (data.code == 200) {
            this.usersid = data.user.idusers;
            this.loginSuccess(username, userspwd);
            //登录成功
          } else if (data.code == 250) {
            this.showWarnAlert('bottom', '登录失败请重试');
          } else {
            this.showWarnAlert('bottom', '请重新输入');
          }
    });
  }
  register() {
    this.navCtrl.push(RegisterPage);
  }

}
