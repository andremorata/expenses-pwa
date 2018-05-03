import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lastPayments: any[] = new Array();
  lastBills: any[] = new Array();

  constructor(public navCtrl: NavController) {
    document.querySelector('body').classList.remove('dark-theme');

    this.buildItemInfo();
  }

  buildItemInfo() {
    this.lastBills = [];
    this.lastPayments = [];

    for (let i = 0; i < 3; i++) {
      let rnd = Math.floor(Math.random() * 200) + 1;
      let value = (rnd + 937.5).toFixed(2);
      let date = new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));
      let installment = Math.floor(Math.random() * 3);

      this.lastBills.push({
        type: 'bill',
        description: `Item 01234 - ${rnd}`,
        date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
        value: value,
        installment: installment >= 2 ? installment : null
      });

      this.lastPayments.push({
        type: 'payment',
        description: `Item 01234 - ${rnd}`,
        date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
        value: value,
        installment: installment >= 2 ? installment : null
      });
    }
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.buildItemInfo();
      refresher.complete();
    }, 2000);
  }
}
