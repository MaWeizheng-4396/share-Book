import { Component, ViewChild } from "@angular/core";
import { NavController } from "ionic-angular";
import { Slides } from "ionic-angular";
import { HttpApi } from "../../app/service/http-api.service";
import { InformationPage } from "../home/information/information";
import { ToastController } from "ionic-angular";

@Component({
  selector: "page-contact",
  templateUrl: "contact.html"
})
export class ContactPage {
  @ViewChild(Slides) slides: Slides;
  informationPage;
  imageUrl: any = [];
  len: any = [];
  buttonWord = [];
  items = [];
  buttonData = [];
  window: Window;
  selectWord = '';
  selectData: boolean = false;
  constructor(public navCtrl: NavController, private httpApi: HttpApi, public toastCtrl: ToastController) {
    this.informationPage = InformationPage;
    // slide
    // 轮播数据
    this.imageUrl = ["ionic", "ionic1", "ionic2", "ionic3"];
    this.len = this.imageUrl.length;
    // 查询数据
    // this.items = [{ img: 'ionic', name: 'JAVA入门' }, { img: 'ionic1', name: 'Angular' }, { img: 'ionic2', name: 'Ionic' }, { img: 'ionic3', name: 'Android' },
    // { img: 'ionic', name: 'JAVA入门' }, { img: 'ionic1', name: 'Angular' }, { img: 'ionic2', name: 'Ionic' }, { img: 'ionic3', name: 'Android' }];

  }
  ionViewWillLoad() {
    this.httpApi.get<any>('species/itemSelect')
      .subscribe(
        data => {
          console.log(data);
          if(data.length > 0){
            this.items = data
          } else{
            this.items= null;
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
  // 查询按钮点击事件
  divOnClick(event, i) {
    console.log(this.buttonWord[i]);
    this.buttonData = [];
    this.httpApi.get<any>('items/items?itemsname=' + this.buttonWord[i])
      .subscribe(
        data => {
          let result = data;
          console.log(result);
          if (result.length > 0) {
            console.log(this.buttonData = [{ img: result[0].imgname },
            { wordData: result[0].itemsname }]);
            this.navCtrl.push(InformationPage, this.buttonData[0].img);
          } else {
            console.log('出错了-.-')
            this.showWarnAlert('bottom', '出错了-.-');
          }
        });
  }
  // 轮播图片点击事件
  imgClick(message, i) {
    this.navCtrl.push(InformationPage, this.imageUrl[i]);
  }
  // 热门内容点击事件
  searchClick(event, i) {
    console.log(this.items[i].name);
    this.navCtrl.push(InformationPage, this.items[i].imgname);
  }
  //轮播问题
  ionViewWillEnter() {
    this.slides.startAutoplay();
  }
  ionViewDidEnter() {
    // 修复轮播手动滑动后不能自动轮播问题
    this.slides.startAutoplay();
    this.slides.autoplayDisableOnInteraction = false;

  }
  ionViewWillLeave() {
    this.slides.stopAutoplay();
  }
  //页面离开时停止自动播放
  ionViewDidLeave() {
    this.slides.stopAutoplay();
  }
  // 搜索框
  selectClick(e) {
    console.log(this.selectWord);
    this.httpApi.get<any>('selectItem/selectItem?itemsname=' + this.selectWord)
      .subscribe(
        data => {
          let result = data;
          if (result.length > 0) {
            this.selectData = false;
            this.items = [];
            for (const key in result) {
              // console.log(result[key]);
              // console.log(this.items.push({ img: result[key].imgname, name: result[key].itemsname }));
              // console.log(this.items);
              this.items.push(result[key]);
            }
          } else {
            this.selectData = true;
            this.items = [];
          }
        });
    this.selectWord = '';
  }
}
