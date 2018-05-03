import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { BillsPage } from '../bills/bills';
import { PaymentsPage } from '../payments/payments';
import { FabContainer, NavController } from 'ionic-angular';
import { AddEditItemPage } from '../add-edit-item/add-edit-item';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  constructor(public navCtrl: NavController) { }

  tabHome = HomePage;
  tabBills = BillsPage;
  tabPayments = PaymentsPage;
  tabAbout = AboutPage;

  goToAddItem(type, e: FabContainer) {
    this.navCtrl.push(AddEditItemPage, { type: type });
    e.close();
  }
}
