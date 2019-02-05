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
import { Subject } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lastPayments: Observable<any[]>;
  lastBills: Observable<any[]>;
  totalBillsObservable: Subject<number>;
  totalBills: number = 0.0;
  totalPaymentsObservable: Subject<number>;
  totalPayments: number = 0.0;
  totalPending: number = 0.0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public aft: AngularFirestore,
    public utils: Utilities,
    public data: DataService
  ) {
    document.querySelector('body').classList.remove('dark-theme');
    registerLocaleData(localePt, 'pt');

    this.totalBillsObservable = new Subject<number>();
    this.totalBillsObservable.subscribe(value => {
      this.totalBills = value;
      this.totalPending = this.totalBills - this.totalPayments;
    });

    this.totalPaymentsObservable = new Subject<number>();
    this.totalPaymentsObservable.subscribe(value => {
      this.totalPayments = value;
      this.totalPending = this.totalBills - this.totalPayments;
    });

    this.buildItemInfo();
  }

  setTotalBills(val: number) {
    this.totalBillsObservable.next(this.totalBills + val);
  }

  setTotalPayments(val: number) {
    this.totalPaymentsObservable.next(this.totalPayments + val);
  }

  async buildItemInfo() {
    let loader = this.utils.showLoading();

    this.lastBills = await this.data.getBills(3);
    this.lastPayments = await this.data.getPayments(3);

    this.totalBillsObservable.next(0);
    this.totalPaymentsObservable.next(0);

    this.getBillsTotal();
    this.getPaymentsTotal();

    loader.dismiss();
  }

  async getBillsTotal() {
    this.setTotalBills(0.0);
    let val = 0.0;
    return await this.data
      .getBills(9999)
      .then(vals => vals
        .flatMap(Expense => Expense)
        .subscribe(x => this.setTotalBills((<Expense>x).value)));
  }

  async getPaymentsTotal() {
    this.setTotalPayments(0.0);
    let val = 0.0;
    return await this.data
      .getPayments(9999)
      .then(vals => vals
        .flatMap(Expense => Expense)
        .subscribe(x => this.setTotalPayments((<Expense>x).value)));
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

  ionViewWillEnter() {
    this.buildItemInfo();
  }
}
