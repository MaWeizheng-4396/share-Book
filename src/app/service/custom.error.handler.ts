import {ErrorHandler, Injectable} from "@angular/core";
import {Events} from "ionic-angular";

@Injectable()
export class MyErrorHandler implements ErrorHandler {

  constructor(private events: Events) {
  }

  handleError(err: any): void {
    if (err.status === 401) {
      this.events.publish('userCheck');
    }
    // do something with the errorswitch (res.status) {
  }
}
