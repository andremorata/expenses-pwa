import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DateValueAccessorModule } from 'angular-date-value-accessor';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { TextMaskModule } from 'angular2-text-mask';

import { AppMain } from './app.component';

import { ComponentsModule } from '../components/components.module';

import { SysVariables } from '../services/utils.service';
import { Settings } from '../services/settings.service';

import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { VersionNotes } from '../pages/version-notes/version-notes';
import { LoginPageModule } from '../pages/login/login.module';
import { BillsPageModule } from '../pages/bills/bills.module';
import { PaymentsPageModule } from '../pages/payments/payments.module';
import { AddEditItemPageModule } from '../pages/add-edit-item/add-edit-item.module';

export const environment = {
  firebase: {
    apiKey: 'AIzaSyBfJicYI7YFsrpnKFhb4SM9e9fbvx4g0-4',
    authDomain: 'expenses-be4ec.firebaseapp.com',
    databaseURL: 'https://expenses-be4ec.firebaseio.com',
    projectId: 'expenses-be4ec',
    storageBucket: 'expenses-be4ec.appspot.com',
    messagingSenderId: '1016103512111'
  }
};

@NgModule({
  declarations: [
    AppMain,
    AboutPage,
    HomePage,
    TabsPage,
    VersionNotes
  ],
  imports: [
    BrowserModule, ComponentsModule, IonicModule.forRoot(AppMain), HttpModule, FormsModule, ReactiveFormsModule, TextMaskModule,
    AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule, AngularFirestoreModule,
    DateValueAccessorModule, LoginPageModule, BillsPageModule, PaymentsPageModule, AddEditItemPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppMain,
    AboutPage,
    HomePage,
    TabsPage,
    VersionNotes
  ],
  providers: [
    StatusBar, SplashScreen, SysVariables, Settings,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
