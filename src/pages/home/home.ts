import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { SelectDetailsPage } from "../home/select-details/select-details";
// import { InformationPage } from "../home/information/information";
// import { Camera } from '@ionic-native/camera';
import { CnmPage } from "../cnm/cnm";

// import * as $ from 'jquery';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  SelectDetailsPage;
  InformationPage;
  searchQuery: any = [];
  items: any = [];
  images: Array<{ src: String }>;
  cnmPage;
  constructor(public navCtrl: NavController) {
    // this.InformationPage = InformationPage;
    this.cnmPage = CnmPage;
    this.searchQuery = '';
    this.items = [{ img: 'ionic.jpg', name: '科技' }, { img: 'ionic1.jpg', name: 'It' }, { img: 'ionic2.jpg', name: '农业' }, { img: 'ionic3.jpg', name: '材料' },
    { img: 'ionic2.jpg', name: 'JAVA入门' }, { img: 'timg4.jpeg', name: 'Angular' }, { img: 'timg2.jpeg', name: 'Ionic' }, { img: 'timg3.jpeg', name: 'Android' }];
    this.images = [];
  }
  searchClick(event, i) {
    console.log(this.items[i] + 'aaaaavvvccccccccc')
    this.navCtrl.push(CnmPage, this.items[i].img);
  }
}
