import {Injectable} from '@angular/core';
import {Events} from "ionic-angular";
import {ThemeableBrowser, ThemeableBrowserOptions} from "@ionic-native/themeable-browser";
import {InAppBrowser} from '@ionic-native/in-app-browser';

@Injectable()
export class CommonService {
  searchArea: string;

  /**
   * 全局变量，保证userCheck 监听器方法，只执行一次
   * @type {boolean} true可以执行， false不可以执行
   */
  public userCheckNum: boolean = true;

  constructor(private events: Events, private themeableBrowser: ThemeableBrowser,private iab:InAppBrowser) {
    this.searchArea = '广州市';
  }

  home_run(value: string) {
    this.events.publish('toRun', value);
  }

  home_zhicheng(value: string) {
    this.events.publish('toZhiCheng', value);
  }

  public getThemeBrowser(url: string){
    if(/iphone/i.test(navigator.userAgent) || /ipad/i.test(navigator.userAgent)){
      this.iab.create(url);
    }else{
      const options: ThemeableBrowserOptions = {
        statusbar: {
          color: '#ffffff'
        },
        toolbar: {
          height: 44,
          color: '#4876FF'
        },
        title: {
          color: '#ffffff',
          showPageTitle: true
        },
        closeButton: {
          image: 'close',
          imagePressed: 'close_pressed',
          align: 'left',
          event: 'closePressed'
        }
      };
      this.themeableBrowser.create(url, '_blank', options);
    }
  }
}
