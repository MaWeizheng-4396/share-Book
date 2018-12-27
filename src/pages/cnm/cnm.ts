import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Slides } from "ionic-angular";
// import { FileUploader } from "ng2-file-upload";
import { HttpApi } from '../../app/service/http-api.service';
import * as $ from 'jquery';
import { HomePage } from '../home/home';
import { ToastController } from "ionic-angular";
// import { FileUploader } from 'ng2-file-upload';
// import { EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { PreviewimgService } from "./previewimg.service";

@Component({
  selector: 'page-cnm',
  templateUrl: 'cnm.html',
})
export class CnmPage implements OnInit {
  // 1
  @ViewChild(Slides) slides: Slides;
  images: Array<{ src: String }>;
  // 3
  HomePage;
  imgData = [];
  uploadStatus = [];
  uploadName: any;
  imagedata: any;
  imgUrl: any;
  imgC: any;
  img: string = '';
  imgBool: boolean = true;
  imgSpeciesNumber: any;
  window: Window;
  fileMoudle: any = null;
  nameData: any = '';
  statusData: any = '';
  username: any = '';
  spenumber: any = '';
  history: any = '';


  filename: string;
  // @Input()
  // previewImgFile
  // @Output()
  // previewImgFileChange: EventEmitter<string> = new EventEmitter();

  // previewImgSrcs = [];
  private showWarnAlert(position: string, warnMessage: string) {
    let toast = this.toastCtrl.create({
      message: warnMessage,
      duration: 3000,
      position: position
    });
    toast.present(toast);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private httpApi: HttpApi) {
    this.HomePage = HomePage;
    this.images = [];
    console.log(this.navParams.data + '1222222222');
    // this.imgData = this.navParams.data;
    this.imgC = this.navParams.data;
    console.log('aaaaa' + this.imgC + 'bbbbbbbbbbb' + this.imgData);
  }

  ngOnInit(){

  }
  ionViewWillLoad() {
    this.username = window.localStorage.username;
    // selectImgid
    this.httpApi.get<any>('uploadFile/selectImgid?imgname=' + this.imgC)
      .subscribe(
        data => {
          console.log(data);
          this.spenumber = data[0].speciesnumber;
        });
  }
  upload() {
    const formData = new FormData();
    this.fileMoudle = (<HTMLInputElement>document.getElementById('docfile')).files[0];
    formData.append("file", this.fileMoudle);
    formData.append("itemsname", this.nameData);
    formData.append("statusdata", this.statusData);
    formData.append("username", window.localStorage.username);
    formData.append("spenumber", this.spenumber);
    if (this.nameData === '') {
      this.showWarnAlert('bottom', '请输入名字');
    } else 　if (this.statusData === '') {
      this.showWarnAlert('bottom', '请输入简介');
    } else 　if (this.fileMoudle === '') {
      this.showWarnAlert('bottom', '请上传文件');
    } else {
      $.ajax({
        url: "http://localhost:8080/api/uploadFile/uploadFile",
        data: formData,
        type: "post",
        dataType: "json",
        cache: false,//上传文件无需缓存
        processData: false,//用于对data参数进行序列化处理 这里必须false
        contentType: false, //必须
        xhrFields: {
          withCredentials: true,
        },
        crossDomain: true,
        success: function (result) {
          if (result.code == 200) {
            // document.getElementById('tf').removeChild;
            alert("上传成功，请等待管理员呢审核!");
            // this.itemsname.push('');
            // location.reload();
            // this.navCtrl.reload();
            // this.navCtrl.push(HomePage);
            console.log(this.itemsname);
          } else {
            alert("上传失败，请检查网络后重试!");
          }
          // this.navCtrl.push(HomePage);
        },
      });
      setTimeout(() => {
        this.navCtrl.push(CnmPage, this.imgC);
      }, 200);
    }
  }
  imgChange() {
    let reg = new RegExp("^[1][3,4,5,7,8,9][0-9]{9}$"); //正则表达式
    if (this.img == "") { //输入不能为空
      alert("图片不能为空!");
      return false;
    } else if (!reg.test(this.img)) { //正则验证不通过，格式不对
      alert("请上传正确的图片格式!");
      return false;
    } else {
      console.log(this.img);
      this.imgBool = true;
      return true;
    }
  }
}


// autoUpload: false
  // });// .+(.JPEG|.jpeg|.JPG|.jpg)$
  // uploader: FileUploader = new FileUploader({
  //   url: "http://localhost:8080/api/uploadFile/uploadFile",
  //   method: "POST",
  //   itemAlias: "uploadedfile",
  //

  // previewPic(event) {
  //   if (!event.target.files[0]) {
  //     return;
  //   }
  //   let that = this;
  //   this.previewimgService.readAsDataUrl(event.target.files[0]).then(function (result) {
  //     that.previewImgSrcs.push(result)
  //     let file = event.target.files[0];
  //     that.previewImgFile.push(file)
  //     that.previewImgFileChange.emit(that.previewImgFile);
  //   })

  // }
  // remove(i) {
  //   this.previewImgSrcs.splice(i, 1);
  //   this.previewImgFile.splice(i, 1);
  // }
