import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";

import { AppMain } from './app.component';

import { ComponentsModule } from '../components/components.module';

import { SysVariables } from '../services/utils.service';
import { Settings } from '../services/settings.service';

import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { LoginPageModule } from "../pages/login/login.module";
import { BillsPageModule } from "../pages/bills/bills.module";
import { PaymentsPageModule } from "../pages/payments/payments.module";

export const environment = {
  firebase: {
    apiKey: "AIzaSyBfJicYI7YFsrpnKFhb4SM9e9fbvx4g0-4",
    authDomain: "expenses-be4ec.firebaseapp.com",
    databaseURL: "https://expenses-be4ec.firebaseio.com",
    projectId: "expenses-be4ec",
    storageBucket: "expenses-be4ec.appspot.com",
    messagingSenderId: "1016103512111"
  }
}

@NgModule({
  declarations: [
    AppMain,
    AboutPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule, ComponentsModule, IonicModule.forRoot(AppMain), HttpModule, FormsModule, ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase), AngularFireDatabaseModule, AngularFireAuthModule,
    LoginPageModule, BillsPageModule, PaymentsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppMain,
    AboutPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar, SplashScreen,
    SysVariables, Settings,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
