import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Utilities } from './utils.service';

@Injectable()
export class DataService {

  user: string;

  constructor(
    public http: Http,
    public db: AngularFirestore,
    public auth: AngularFireAuth,
    public utils: Utilities
  ) {
    this.auth.authState.subscribe(user => {
      if (user) this.user = user.email;
    });
  }

  async init() {
    let firestore;

    // await firebase
    //   .firestore()
    //   .enablePersistence()
    //   .then(() => {
    //     firestore = firebase.firestore();
    //     const settings = {
    //       timestampsInSnapshots: true
    //     };
    //     firestore.settings(settings);
    //   });

    firestore = firebase.firestore();
    const settings = {
      timestampsInSnapshots: true
    };
    firestore.settings(settings);
  }

  loadConfigurationFile() {
    return this.http.get('/appSettings.json')
      .map((res: Response) => res.json());
  }

  async getBills(limit: number) {
    if (!limit) limit = 9999;
    return await this.db
      .collection('bills', ref => ref
        .orderBy('date', 'desc')
        .limit(limit))
      .valueChanges();
  }

  async getPayments(limit: number) {
    if (!limit) limit = 9999;
    return await this.db
      .collection('payments', ref => ref
        .orderBy('date', 'desc')
        .limit(limit))
      .valueChanges();
  }

  async addBill(data: any) {
    let inputData = {
      id: this.db.createId(),
      user: this.user,
      description: data.description,
      date: data.date,
      value: data.value,
      installment: data.installment,
      created: firebase.firestore.FieldValue.serverTimestamp()
    };

    return await this.db.collection('bills')
      .doc(inputData.id)
      .set(inputData)
      .then(docRef => {
        console.log('Salvo com sucesso!', data.id);
      })
      .catch(err => {
        console.error('Error adding document: ', err);
      });
  }

  async editBill(data: any) {
    let inputData = {
      user: this.user,
      description: data.description,
      date: data.date,
      value: data.value,
      installment: data.installment,
      created: firebase.firestore.FieldValue.serverTimestamp()
    };

    return this.db.collection('bills').doc(data.id).set(inputData, { merge: true });
  }

  async deleteBill(item: any) {
    if (item.id) {
      return await this.delete('b', item);
    } else {
      throw 'Id não existe no objeto';
    }
  }

  async addPayment(data: any) {
    let inputData = {
      id: this.db.createId(),
      user: this.user,
      description: data.description,
      date: data.date,
      value: data.value,
      installment: data.installment,
      created: firebase.firestore.FieldValue.serverTimestamp()
    };

    return await this.db.collection('payments')
      .doc(inputData.id)
      .set(inputData)
      .then(docRef => {
        console.log('Salvo com sucesso!', data.id);
      })
      .catch(err => {
        console.error('Error adding document: ', err);
      });
  }

  async editPayment(data: any) {
    let inputData = {
      user: this.user,
      description: data.description,
      date: data.date,
      value: data.value,
      installment: data.installment,
      created: firebase.firestore.FieldValue.serverTimestamp()
    };

    return this.db.collection('payments').doc(data.id).set(inputData, { merge: true });
  }

  async deletePayment(item: any) {
    if (item.id) {
      return await this.delete('p', item);
    } else {
      throw 'Id não existe no objeto';
    }
  }

  private async delete(type: string, item: any) {
    return await this.db.collection(type === 'b' ? 'bills' : 'payments')
      .doc(item.id)
      .delete()
      .then(() => {
        console.log('Removido com sucesso!', item.id);
      })
      .catch(err => {
        console.error('Error deleting document: ', err);
      });
  }
}
