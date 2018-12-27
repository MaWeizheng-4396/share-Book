import { NgModule } from '@angular/core';
import { CommonService } from "./common.service";
import { HttpApi } from "./http-api.service";
import { TransformService } from "./transform.service";
import { NoticeService } from "./notice.service";
import { ImgService } from "./img.service";
import { PreviewimgService } from "../../pages/cnm/previewimg.service";

const services = [
  CommonService,
  HttpApi,
  TransformService,
  NoticeService,
  ImgService,
  PreviewimgService
];

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [...services]
})
export class ServiceModule {
}
