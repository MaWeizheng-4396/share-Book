import { Component } from '@angular/core';
import { HttpApi } from "../../../app/service/http-api.service";
import { NavController, NavParams } from 'ionic-angular';
// import * as _ from 'lodash';
import { InformationPage } from "../../home/information/information";
import { ToastController } from "ionic-angular";

@Component({
  selector: 'page-my-message',
  templateUrl: 'my-message.html',
})
export class MyMessagePage {

  InformationPage;
  window: Window;
  imgData = [];
  imgData1 = [];
  appointData = [];
  isSelected: boolean = false;
  selectData: boolean = false;
  determineData: boolean = false;
  appointSelect: boolean = false;
  appointSelect1: boolean = false;
  appointSelect2: boolean = false;
  appointSelect3: boolean = false;
  appointSelect4: boolean = false;
  deterDataSelect: boolean = false;
  returnMessage = [];
  returnMessage1 = [];
  returnData = [];
  determine = [];
  deterMessage = [];
  deterMessage1 = [];
  deterMessage2 = [];
  deterMessage3 = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private httpApi: HttpApi) {
    this.InformationPage = InformationPage;
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

    //查询评论
    this.httpApi.get<any>('mymessage/mymessage?usersname=' + window.localStorage.username).subscribe(
      data => {
        console.log(data);
        if (data.length > 0) {
          this.selectData = true;
          for (const key in data) {
            this.imgData.push(data[key].com_speciesid);
          }
          console.log(this.imgData);
          for (let i = 0; i < this.imgData.length; i++) //遍历当前数组
          {
            if (this.imgData1.indexOf(this.imgData[i]) == -1) {
              this.imgData1.push(this.imgData[i]);
            }
          }
        } else {
          this.selectData = false;
        }
        console.log(this.imgData1.indexOf(this.imgData));
      });
    // 查询预约
    this.httpApi.get<any>('mymessage/appointsMessage?usersname=' + window.localStorage.username).subscribe(
      data => {
        console.log(data);
        console.log(data.length);
        console.log(typeof (data[0].status));
        if (data.length === 0) {
          this.isSelected = false;
        } else {
          for (const key in data) {
            console.log(data[key].status === '0');
            console.log(data[key].status === '1');
            console.log(data[key].status === '2');
            if (data[key].status === '0') {
              this.isSelected = false;
            } else if (data[key].status === '1') {
              this.isSelected = true;
              this.httpApi.get<any>('appointSelect/returnAppiont?usersname=' + window.localStorage.username).subscribe(
                data1 => {
                  console.log(data1);
                  for (const key in data1) {
                    if (data[key].status === '') {
                      this.returnMessage = data1[key];
                    } else {

                    }
                    this.returnData.push(false);
                  }
                });
            } else if (data[key].status === '2') {
              this.httpApi.get<any>('appointSelect/returnAppiont?usersname=' + window.localStorage.username).subscribe(
                data2 => {
                  console.log(data2);
                  this.determine = data2;
                });
            } else if (data[key].status === '3') {
              console.log(data == 3);
              this.deterDataSelect = true;
              this.httpApi.get<any>('appointSelect/returnAppiont?usersname=' + window.localStorage.username).subscribe(
                data2 => {
                  console.log(data2[0]);
                  this.returnMessage1 = data2;
                  // for (const key in data2) {
                  //   this.returnData[key].push(null);
                  // }
                });
            } else {
              this.isSelected = true;
              for (const key in data) {
                this.appointData.push(data[key]);
              }
            }
          }
        }

        console.log(data);
        console.log(this.appointData);
      });
    // 查询我的预约
    this.httpApi.get<any>('mymessage/returnMessage?appointuname=' + window.localStorage.username).subscribe(
      data => {
        console.log(window.localStorage.username);
        console.log(data);
        if (data.length > 0) {
          for (const key in data) {
            if (data[key].status === '0') {
              this.deterMessage.push(data[key]);
              this.appointSelect = true;
              this.appointSelect1 = true;
              this.appointSelect2 = false;
              this.appointSelect3 = false;
            } else if (data[key].status === '1') {
              this.deterMessage1.push(data[key]);
              this.appointSelect = true;
              this.appointSelect1 = false;
              this.appointSelect2 = false;
              this.appointSelect3 = true;
            } else if (data[key].status === '2') {
              this.deterMessage2.push(data[key]);
              console.log(this.deterMessage2);
              this.appointSelect = true;
              this.appointSelect1 = false;
              this.appointSelect2 = true;
              this.appointSelect3 = false;
            } else {
              this.appointSelect = false;
              this.appointSelect1 = false;
              this.appointSelect2 = false;
              this.appointSelect3 = false;
            }
          }
          // for (const key in data) {
          //   console.log(typeof(data[key].status));
          //   console.log(data[key].status == '0');
          //   console.log(data[key].status == '1');
          //   console.log(data[key].status == '2');
          //     if (data[key].status === '0') {
          //       this.appointSelect = true;
          //       this.appointSelect1 = true;
          //       this.deterMessage.push(data[key]);
          //       console.log(this.deterMessage.push(data[key]));
          //     } else if (data[key].status == 1) {
          //       console.log(data);
          //       console.log("对方没有回应");
          //       this.appointSelect = true;
          //       this.appointSelect2 = false;
          //       this.appointSelect1 = false;
          //       this.appointSelect4 = false;
          //       this.appointSelect3 = true;
          //       this.deterMessage1.push(data[key]);
          //     } else if (data[key].status == 2) {
          //       console.log("同意了");
          //       this.deterMessage2.push(data[key]);
          //       console.log(this.deterMessage2);
          //       this.appointSelect = true;
          //       this.appointSelect3 = false;
          //       this.appointSelect1 = false;
          //       this.appointSelect4 = false;
          //       this.appointSelect2 = true;
          //     } else if (data[key].status == 3) {
          //       console.log("归还了");
          //       this.deterMessage3.push(data[key]);
          //       this.appointSelect = true;
          //       this.appointSelect3 = false;
          //       this.appointSelect1 = false;
          //       this.appointSelect2 = false;
          //       this.appointSelect4 = true;
          //     } else {
          //       console.log("cnm");
          //     }

          // }
        } else {
          console.log("cnm1");
        }

      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyMessagePage');
  }
  // mymessage returnAppiont returnMessage

  commentsClick() {
    this.navCtrl.push(InformationPage, this.imgData);
  }
  returnInMessage(i) {
    console.log(i);
    console.log(this.returnData[i]);
    console.log(this.returnMessage[i]);
    this.returnData.push(true);
    this.httpApi.get<any>('appointSelect/updateAppoint?idappoint=' + this.returnMessage[i].idappoint).subscribe(
      data => {
        console.log(typeof (data.code));
        if (data.code === '200') {
          this.showWarnAlert('bottom', '您的操作成功了');
          this.ionViewWillLoad();
        } else if (data.code === '250') {
          this.showWarnAlert('bottom', '您的操作失败了，请重试');
        } else {
          this.showWarnAlert('bottom', '由于未知错误导致了您的操作失败，请重试');
        }
      });
  }
  returnOnMessage(i) {
    console.log(i);
    this.returnData[i].push(false);
    this.httpApi.get<any>('appointSelect/updateOnAppoint?idappoint=' + this.returnMessage[i].idappoint).subscribe(
      data => {
        console.log(typeof (data.code));
        if (data.code === '200') {
          this.showWarnAlert('bottom', '您的操作成功了');
          this.ionViewWillLoad();
        } else if (data.code === '250') {
          this.showWarnAlert('bottom', '您的操作失败了，请重试');
        } else {
          this.showWarnAlert('bottom', '由于未知错误导致了您的操作失败，请重试');
        }
      });
  }
  deterReturn(i) {
    console.log(this.returnMessage1[i]);
    this.httpApi.get<any>('appointSelect/deterReturn?imgname=' + this.returnMessage1[i].imgname).subscribe(
      data => {
        console.log(data);
        if (data.code == 200) {
          alert("确定成功");
        } else if (data.code == 250) {
          alert("失败，请重试");
        } else {
          console.log("cnm");
        }
      });
  }
}
