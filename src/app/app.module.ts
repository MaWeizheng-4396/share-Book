import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { MyDownPage } from "../pages/about/my-down/my-down";
import { MyMessagePage } from "../pages/about/my-message/my-message";
import { AppAboutPage } from "../pages/about/app-about/app-about";
import { OwnPage } from "../pages/about/own/own";
import { MyVersionPage } from "../pages/about/my-version/my-version";
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { SelectDetailsPage } from "../pages/home/select-details/select-details";
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from "../pages/register/register";
import { InformationPage } from "../pages/home/information/information";
import { CnmPage } from "../pages/cnm/cnm";
import { DownloadPage } from "../pages/about/download/download";
import { AppointPage } from "../pages/about/appoint/appoint";
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServiceModule } from "./service/service.module";
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Editor } from "primeng/components/editor/editor";
import { QuillModule } from 'ngx-quill';
import { CommonModule } from "@angular/common";
import { FileUploadModule } from "ng2-file-upload";
import { RadioGroup } from "ionic-angular";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    InformationPage,
    MyDownPage,
    MyMessagePage,
    AppAboutPage,
    OwnPage,
    MyVersionPage,
    SelectDetailsPage,
    CnmPage,
    DownloadPage,
    AppointPage,
    Editor,
  ],
  imports: [
    FileUploadModule,
    CommonModule,
    BrowserModule,
    ServiceModule,
    HttpClientModule,
    QuillModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    InformationPage,
    MyDownPage,
    MyMessagePage,
    AppAboutPage,
    OwnPage,
    MyVersionPage,
    SelectDetailsPage,
    CnmPage,
    DownloadPage,
    AppointPage,
    Editor,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RadioGroup,
    Camera,
    ImagePicker,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
