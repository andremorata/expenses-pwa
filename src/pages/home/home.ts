import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Utilities } from '../../services/utils.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { AngularFirestore } from 'angularfire2/firestore';
import { DataService } from '../../services/data.service';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Expense } from '../../models/expense';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lastPayments: Observable<any[]>;
  lastBills: Observable<any[]>;
  totalBills: number = 0.0;
  totalPayments: number = 0.0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public aft: AngularFirestore,
    public utils: Utilities,
    public data: DataService
  ) {
    document.querySelector('body').classList.remove('dark-theme');
    registerLocaleData(localePt, 'pt');
    this.buildItemInfo();
  }

  async buildItemInfo() {
    let loader = this.utils.showLoading();
    this.lastBills = await this.data.getBills(3);
    this.lastPayments = await this.data.getPayments(3);
    await this.getBillsTotal();
    await this.getPaymentsTotal();
    this.totalBills = this.totalBills - this.totalPayments;
    loader.dismiss();
  }

  async getBillsTotal() {
    this.totalBills = 0.0;
    await this.data
      .getBills(9999)
      .then(vals => vals
        .flatMap(Expense => Expense)
        .subscribe(x => this.totalBills += (<Expense>x).value));
  }

  async getPaymentsTotal() {
    this.totalPayments = 0.0;
    await this.data
      .getPayments(9999)
      .then(vals => vals
        .flatMap(list => list)
        .subscribe(x => this.totalBills += (<Expense>x).value));
  }

  getDate(val: number) {
    return new Date(val * 1000);
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.buildItemInfo();
      refresher.complete();
    }, 1000);
  }
}
