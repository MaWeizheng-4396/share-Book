import { Component } from '@angular/core';
import { HttpApi } from "../../app/service/http-api.service";
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from "ionic-angular";
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  usersname: string = '';
  usersStudentId: string = '';
  userspwd: string = '';
  userspwd1: string = '';
  email: string = '';
  tel: string = '';
  canClick: boolean;
  description: any;
  second = 59;
  window: Window;
  timerHandler: any;
  userBool: boolean = false;
  pwdBool: boolean = false;
  pwd1Bool: boolean = false;
  emailBool: boolean = false;
  telBool: boolean = false;
  stuidBool: boolean = false;

  imgClass: boolean = false;
  flag: boolean = true;//状态true为正常的状态,false为放大的状态
  imgH;//图片的高度
  imgW;//图片的宽度
  img = document.getElementsByTagName('img')[0];//图片元素



  private showWarnAlert(position: string, warnMessage: string) {
    let toast = this.toastCtrl.create({
      message: warnMessage,
      duration: 3000,
      position: position
    });
    toast.present(toast);
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private httpApi: HttpApi) {
    this.canClick = false;
    this.description = "获取验证码";
  }



  getTestCode = function () {
    this.timerHandler = window.setInterval(function () {
      if (this.second <= 0) {
        // $interval.cancel(this.timerHandler);
        this.timerHandler.cancel;
        this.second = 59;
        this.description = "获取验证码";
        this.canClick = false;
      } else {
        this.description = this.second + "s后重发";
        this.second--;
        this.canClick = true;
      }
    }, 1000)
  };
  // ^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$
  telChange() {
    let reg = new RegExp("^[1][3,4,5,7,8,9][0-9]{9}$"); //正则表达式
    if (this.tel == "") { //输入不能为空
      alert("手机号不能为空!");
      return false;
    } else if (!reg.test(this.tel)) { //正则验证不通过，格式不对
      alert("请输入正确的手机号!");
      return false;
    } else {
      this.telBool = true;
      return true;
    }
  }
  pssswdChange() {
    let reg = new RegExp("^[a-zA-Z0-9]{6,18}$"); //正则表达式
    if (this.userspwd == "") { //输入不能为空
      alert("输入不能为空!");
      return false;
    } else if (!reg.test(this.userspwd)) { //正则验证不通过，格式不对
      alert("请输入6-18位密码!");
      return false;
    } else {
      this.pwdBool = true;
      return true;
    }
  }
  pwd1Change() {
    if (this.userspwd1 !== this.userspwd) {
      alert("请输入正确的确认密码");
    } else {
      this.pwd1Bool = true;
    }
  }
  emailChange() {
    let reg = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$"); //正则表达式
    if (this.email == "") { //输入不能为空
      alert("输入不能为空!");
      return false;
    } else if (!reg.test(this.email)) { //正则验证不通过，格式不对
      alert("请输入正确的邮箱!");
      return false;
    } else {
      this.emailBool = true;
      return true;
    }
  }
  registClick() {
    if (this.usersname == '') {
      alert("请输入用户名");
    } else if (this.userspwd == '') {
      alert("请输入密码");
    } else if (this.userspwd1 == '') {
      alert("请输入确认密码");
    } else if (this.usersStudentId == '') {
      alert("请输入学号");
    } else if (this.email == '') {
      alert("请输入邮箱");
    } else if (this.tel == '') {
      alert("请输入手机号");
    } else {
      this.userBool = true;
      this.stuidBool = true;
      // userRegister;
      this.httpApi.get<any>('userRegister/userRegister?usersname=' + this.usersname + '&userspwd=' + this.userspwd +
        '&users_email=' + this.email + '&users_tel=' + this.tel + '&usersStudentId=' +
        this.usersStudentId)
        .subscribe(
          data => {
            //显示结果
            if (data.code == 200) {
              this.navCtrl.push(LoginPage);
              this.showWarnAlert('bottom', '注册成功，请登录');
              //登录成功
            } else if (data.code == 250) {
              this.showWarnAlert('bottom', '注册失败请重试');
            } else {
              this.showWarnAlert('bottom', '请重新输入');
            }
          });
    }
  }
  imgClick() {
    this.imgClass = !this.imgClass;
  };
}
