import {Injectable} from '@angular/core';

@Injectable()
export class TransformService {

  constructor() {
  }

  /**
   * 获取饼图数据
   */
  public onPieArray(paramX: Array<any>, paramY: Array<any>){
    let result:any = [];
    for (let i = 0; i < paramX.length; i++) {
      result.push({'name': paramX[i] , 'value': paramY[i]});
    }
    return result;
  }

}
