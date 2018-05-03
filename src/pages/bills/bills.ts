import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utilities } from '../../services/utils.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { AngularFirestore } from 'angularfire2/firestore';
import { DataService } from '../../services/data.service';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

@IonicPage()
@Component({
  selector: 'page-bills',
  templateUrl: 'bills.html',
  providers: [Utilities, DataService]
})
export class BillsPage {

  items: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public aft: AngularFirestore,
    public utils: Utilities,
    public data: DataService
  ) {
    registerLocaleData(localePt, 'pt');
    this.items = data.getBills();
  }

  public getDate(val) {
    return new Date(val * 1000);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad BillsPage');
  }

}
