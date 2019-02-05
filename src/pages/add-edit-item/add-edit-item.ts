import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utilities } from '../../services/utils.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Expense } from '../../models/expense';

@IonicPage()
@Component({
  selector: 'page-add-edit-item',
  templateUrl: 'add-edit-item.html',
  providers: [Utilities, DataService]
})
export class AddEditItemPage {
  @ViewChild('description') descriptionInput;

  public editItem: Expense;
  public type: string;
  public typeString: string;
  public form: FormGroup;

  numMaskDef = {
    prefix: '',
    allowDecimal: true,
    decimalSymbol: ',',
    thousandsSeparatorSymbol: '.',
    decimalLimit: 2,
    requireDecimal: true
  };
  numMask: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public utils: Utilities,
    public data: DataService
  ) {

    this.numMask = this.utils.createNumberMask(this.numMaskDef);

    this.type = this.navParams.get('type');
    this.editItem = this.navParams.get('data');

    if (this.type) {
      this.typeString = this.type === 'bill' ? 'Conta' : 'Pagamento';
    }

    this.form = this.fb.group({
      id: [''],
      description: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(150),
        Validators.required
      ])],
      date: [new Date().toISOString(), Validators.compose([
        Validators.required
      ])],
      value: [0, Validators.compose([
        Validators.min(1),
        Validators.required
      ])],
      installment: [1, Validators.compose([
        Validators.min(1),
        Validators.required
      ])],
      created: [''],
      user: [''],
    });
  }

  ionViewDidLoad() {
    if (this.editItem) {
      this.form.setValue({
        id: this.editItem.id,
        description: this.editItem.description,
        date: this.getDate(this.editItem.date.seconds).toISOString(),
        value: this.editItem.value.toFixed(2).replace(',','').replace('.',','),
        installment: this.editItem.installment,
        created: this.utils.convertDate(this.editItem.created.seconds),
        user: this.editItem.user
      });
    }
  }

  cleanNumber(e) {
    if (e.value === 0 || e.value === '0') {
      e.value = '';
      return;
    }

    if (e.value.toString().indexOf(this.numMaskDef.decimalSymbol) > -1) {
      let dh = this.numMaskDef.decimalLimit;
      if (Number(dh) > 0) {
        let afterComma = e.value.split(',')[1];
        let beforeComma = e.value.split(',')[0];
        if (afterComma.length < dh)
          e.value += '0';
        if (afterComma.length > dh)
          e.value = `${beforeComma},${afterComma.substr(0, 2)}`;
        if (afterComma === '')
          e.value = `${e.value}${this.numMaskDef.decimalSymbol}00`;
      }
    } else {
      e.value = `${e.value}${this.numMaskDef.decimalSymbol}00`;
    }
  }

  cancel() {
    this.navCtrl.pop();
  }

  submit() {
    let dt = {
      id: this.form.value.id,
      description: this.form.value.description,
      date: this.utils.parseISOString(this.form.value.date),
      value: parseFloat(this.form.value.value.toString().replace('.','').replace(',','.')),
      installment: parseInt(this.form.value.installment, 10),
    };

    if (this.type === 'bill') {
      if (this.editItem)
        this.editBill(dt);
      else
        this.addBill(dt);
    } else {
      if (this.editItem)
        this.editPayment(dt);
      else
        this.addPayment(dt);
    }
  }

  getDate(seconds:number) {
    return new Date(seconds * 1000);
  }

  addBill(data) {
    let loader = this.utils.showLoading();
    this.data.addBill(data)
      .then(() => {
        loader.dismiss();
        this.utils.toast('Salvo com sucesso!');
        this.navCtrl.popToRoot();
      })
      .catch((err) => {
        loader.dismiss();
        this.utils.alert(`Falha ao salvar as informações.`, 'Erro');
        console.log('Erro ao salvar', err);
      });
  }

  addPayment(data) {
    let loader = this.utils.showLoading();
    this.data.addPayment(data)
      .then(() => {
        loader.dismiss();
        this.utils.toast('Salvo com sucesso!');
        this.navCtrl.popToRoot();
      })
      .catch((err) => {
        loader.dismiss();
        this.utils.alert(`Falha ao salvar as informações.`, 'Erro');
        console.log('Erro ao salvar', err);
      });
  }

  editBill(data) {
    let loader = this.utils.showLoading();
    this.data.editBill(data)
      .then(() => {
        loader.dismiss();
        this.utils.toast('Salvo com sucesso!');
        this.navCtrl.popToRoot();
      })
      .catch((err) => {
        loader.dismiss();
        this.utils.alert(`Falha ao salvar as informações.`, 'Erro');
        console.log('Erro ao salvar', err);
      });
  }

  editPayment(data) {
    let loader = this.utils.showLoading();
    this.data.editPayment(data)
      .then(() => {
        loader.dismiss();
        this.utils.toast('Salvo com sucesso!');
        this.navCtrl.popToRoot();
      })
      .catch((err) => {
        loader.dismiss();
        this.utils.alert(`Falha ao salvar as informações.`, 'Erro');
        console.log('Erro ao salvar', err);
      });
  }

}
