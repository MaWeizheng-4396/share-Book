import { Component } from '@angular/core';
import { HttpApi } from "../../../app/service/http-api.service";
import { NavController, NavParams } from 'ionic-angular';
import { SelectDetailsPage } from "../select-details/select-details";
import { ToastController } from "ionic-angular";
import { OwnPage } from '../../about/own/own';

@Component({
  selector: 'page-information', templateUrl: 'information.html',
})

export class InformationPage {
  SelectDatailsPage;
  imgData: any;
  selectData: any;
  selectImgData;
  text: String;
  editorContent: any = [];
  editorContent1: any = [];
  window: Window;
  comments: any = '';
  commentsName: String;
  isSelected: boolean = false;
  replyComments: boolean = false;
  replyData: any = [];
  replyData1: any = [];
  replyComments1: boolean = false;
  replyWord: any = [];
  paramsData = [];
  stateData;
  cnmImg = '';
  status = '';
  appointData: boolean = false;
  userData = '';
  nowLength: any = 0;
  SurplusLength: any = 100;
  selectReturn: boolean = false;
  OwnPage;
  a = 1;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpApi: HttpApi, public toastCtrl: ToastController) {
    this.imgData = this.navParams.data;
    console.log(this.imgData);
    this.OwnPage = OwnPage;
    this.SelectDatailsPage = SelectDetailsPage;
  }

  ionViewWillLoad() {
    this.selectData = {};
    this.httpApi.get<any>('information/information?imgname=' + this.imgData).subscribe(data => {
      let result = data;
      console.log(result);
      this.selectData = result[0]; // this.selectImgData = this.selectData.imgname;
    });
    this.httpApi.get<any>('appointSelect/appointSelect?imgname=' + this.imgData).subscribe(data => {
      let result = data;
      console.log(this.imgData);
      console.log(result);
      if (result[0] !== null) {
        console.log(result[0].imgname);
        this.paramsData = result[0];
        this.cnmImg = result[0].imgname;
        this.stateData = result[0].state;
        this.userData = result[0].idusers;
      } else {
        this.showWarnAlert('bottom', '暂时没有数据');
      }
    });

    this.httpApi.get<any>('appointSelect/selectUser?imgname=' + this.imgData).subscribe(data => {
      console.log(data);
      if (data.length > 0) {
        if (data[0].appointuname == window.localStorage.username) {
          this.appointData = true;
        }
      } else {
        this.appointData = false;
      }
    });

    // 查询评论
    this.httpApi.get<any>('commonts/select?com_speciesid=' + this.imgData).subscribe(data => {
      let result = data;
      console.log(result.length);
      console.log(result);
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          this.replyData.push(false);
          this.replyData1.push(false);
          if (result[i].replyStatus === '' || result[i].replyStatus === null || result[i].replyStatus === undefined) {
            this.replyWord.push(false);
          } else {
            this.replyWord.push(true);
          }
        }
        console.log(this.replyWord);
        // if(result.)
        this.isSelected = true;
        this.comments = result;
      } else {
        console.log("此物品暂时没有评论");
      }
    });

  }
  private showWarnAlert(position: string, warnMessage: string) {
    let toast = this.toastCtrl.create({
      message: warnMessage,
      duration: 3000,
      position: position
    });
    toast.present(toast);
  }
  // 评论
  commentsClick(event, editorContent) {
    console.log(this.editorContent);
    if (this.editorContent.length - 4 === 0) {
      this.showWarnAlert('bottom', '暂时没有评论数据');
    } else if (this.editorContent.substring(3, this.editorContent.length - 4) === null || this.editorContent.substring(3, this.editorContent.length - 4) === '' || this.editorContent.substring(3, this.editorContent.length - 4).length === 0) {
      console.log(this.editorContent.substring(3, this.editorContent.length - 4));
      this.showWarnAlert('bottom', '请先评论');
    } else {
      // /api/commonts
      this.httpApi.get<any>('commonts/commonts?com_speciesid=' + this.imgData + '&com_status=' + this.editorContent.substring(3, this.editorContent.length - 4) + '&com_userid=' + window.localStorage.id).subscribe(data => {
        let result = data;
        console.log(result);
        if (result['code'] === '200') {
          this.comments = this.editorContent.substring(3, this.editorContent.length - 4);
          console.log('aaaaaaaaaa'+ this.comments);
          this.commentsName = window.localStorage.username;
          this.isSelected = true;
          this.editorContent = null;
        }
        else {
          this.showWarnAlert('bottom', '评论失败，请重试');
        }
      });
    }
  }

  // 查看评论人信息
  usersnameClick(i) {
    console.log(this.comments[i].usersname);
    this.navCtrl.push(OwnPage, this.comments[i].usersname);
  }
  // replyNameClick(i){
  //   this.navCtrl.push(OwnPage, this.comments[i].usersname);
  // }
  // 回复
  replyClick(i) {
    // 填充ngClass属性为false
    this.replyData.fill(false);
    this.replyData1.fill(false);
    console.log(this.comments[i].id);
    // 填充点击ngClass属性为true
    this.replyData[i] = true;
    this.replyData1[i] = true;
    this.comments[i].isSelected = false;
  }
  // 确认回复
  rewReplyClick(event, editorContent1, i) {
    if (this.editorContent1.length - 4 === 0) {
      this.showWarnAlert('bottom', '请填写回复');
    } else if (this.editorContent1.substring(3, this.editorContent1.length - 4) === null) {
      this.showWarnAlert('bottom', '请填写回复');
    } else {
      // reply
      this.httpApi.get<any>('reply/reply?rep_id=' + this.comments[i].id + '&replyStatus=' + this.editorContent1.substring(3, this.editorContent1.length - 4) + '&rep_usersid=' + window.localStorage.id).subscribe(data => {
        let result = data;
        console.log(typeof(result.code));
        if (result.code === '200') {
          this.replyData[i] = false;
          this.replyData1[i] = false;
          this.showWarnAlert('bottom', '回复成功');
        } else {
          this.showWarnAlert('bottom', '回复失败，请重试');
        }
      });
    }
  }
  // 取消回复
  upReplyClick(i) {
    this.replyData[i] = false;
    this.replyData1[i] = false;
  }


  // 预约
  appointmentMessage() {
    if (this.selectData.state == 0) {
      this.navCtrl.push(SelectDetailsPage, this.cnmImg);
    } else if (this.selectData.state == 1) {
      // this.paramsData
      this.showWarnAlert('bottom', '在您之前已有人预约');
    } else if (this.selectData.state == 2) {
      this.showWarnAlert('bottom', '被别人拿走了');
    } else {
      this.showWarnAlert('bottom', '由于未知错误导致预约失败，请稍后重试');
    }
  }

  returnClick() {
    console.log(this.selectData.imgname);
    this.httpApi.get<any>('appointSelect/retutnUpdata?imgname=' + this.selectData.imgname)
      .subscribe(
        data => {
          if (data.code == 200) {
            this.appointData = false;
            if (this.a) {
              this.selectReturn = true
              this.showWarnAlert('bottom', '归还成功，请联系对方确认');
              this.a = 0;
            } else {
              this.showWarnAlert('bottom', '请勿重复点击');
            }
          } else if (data.code == 250) {
            this.showWarnAlert('bottom', '归还失败请重试');
          } else {
            this.showWarnAlert('bottom', '因未知错误导致失败，请稍后重试');
          }
        });
  }

}
