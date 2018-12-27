import { Injectable }     from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class NoticeService {
  static TOAST_POS_BOTTOM: string = 'bottom';
  static TOAST_POS_MIDDLE: string = 'middle';

  constructor(private toastCtrl: ToastController) {
  }

  // 显示 toast提示
  showToast(message: string, position: string = NoticeService.TOAST_POS_BOTTOM) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: position
    });
    toast.present();

    return toast;
  }

  /*showNoticeByToast(code: Number, msg: string) {
    let m = '';
    if(code == 1) {
      m = '提示：' + msg + '！';
    } else {
      m = '错误' + code + '：' + msg + '！';
    }

    return this.showToast(m);
  }*/

  showNoticeByToast(code: Number, msg: string) {
    let m = '';

    if(msg && msg.length > 0) {
      if(msg.charAt(msg.length - 1) == '!' || msg.charAt(msg.length - 1) == '！') {
        msg = msg.substr(0, msg.length - 1);
      }
    }

    if(code == 1) {
      m = '提示：' + msg + '！';
    } else {
      m = '错误' + code + '：' + msg + '！';
    }

    return this.showToast(m);
  }
}
