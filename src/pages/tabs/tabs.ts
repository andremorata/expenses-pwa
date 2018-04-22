import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { BillsPage } from '../bills/bills';
import { PaymentsPage } from '../payments/payments';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = HomePage;
  tabBills = BillsPage;
  tabPayments = PaymentsPage;
  tabAbout = AboutPage;

  constructor() {

  }
}
