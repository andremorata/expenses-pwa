import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utilities } from '../../services/utils.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { AngularFirestore } from 'angularfire2/firestore';
import { DataService } from '../../services/data.service';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AddEditItemPage } from '../add-edit-item/add-edit-item';

@IonicPage()
@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html',
  providers: [Utilities, DataService]
})
export class PaymentsPage {

  items: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public aft: AngularFirestore,
    public utils: Utilities,
    public data: DataService
  ) {
    registerLocaleData(localePt, 'pt');
    let loader = utils.showLoading();
    data.getPayments(9999)
      .then(data => {
        this.items = data;
        loader.dismiss();
      })
      .catch(err => {
        loader.dismiss();
        utils.alert('Erro ao recuperar os pagamentos', 'Erro');
        console.error('Erro ao recuperar os pagamentos', err);
      });
  }

  getDate(val: number) {
    return new Date(val * 1000);
  }

  async delete(payment) {
    this.utils.confirm('Deseja realmente excluir este item?', 'Excluir Pagamento', async () => {
      await this.data.deletePayment(payment);
    });
  }

  async edit(payment) {
    this.navCtrl.push(AddEditItemPage, { type: 'payment', data: payment });
  }

}
