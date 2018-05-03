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

  init() {
    const firestore = firebase.firestore();
    const settings = {
      timestampsInSnapshots: true
    };
    firestore.settings(settings);
  }

  loadConfigurationFile() {
    return this.http.get('/appSettings.json')
      .map((res: Response) => res.json());
  }

  getBills() {
    return this.db.collection('bills').valueChanges();
  }

  getPayments() {
    return this.db.collection('payments').valueChanges();
  }

  async addBill(data: any) {
    let inputData = {
      user: this.user,
      description: data.description,
      date: data.date,
      value: data.value,
      installment: data.installment,
      created: firebase.firestore.FieldValue.serverTimestamp()
    };

    return await this.db.collection('bills')
      .add(inputData)
      .then(docRef => {
        data.id = docRef.id;
        console.log('Salvo com sucesso!', data.id);
      })
      .catch(err => {
        console.error('Error adding document: ', err);
      });
  }

  editBill(data: any) {
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

}
