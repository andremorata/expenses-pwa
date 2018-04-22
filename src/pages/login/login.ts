import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Utilities } from '../../services/utils.service';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Utilities]
})
export class LoginPage {

  public form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    private afAuth: AngularFireAuth,
    public utils: Utilities
  ) {
      // document.querySelector('body').classList.add('dark-theme');

      this.form = this.fb.group({
        username: ['', Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.email,
          Validators.required
        ])],
        password: ['', Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(40),
          Validators.required
        ])]
      });

  }

  keypress(event) {
    if (event.code === 'Enter') this.submit();
  }

  submit() {
    let loader = this.utils.showLoading({ content: 'Autenticando...' });

    this.afAuth.auth
      .signInWithEmailAndPassword(
        this.form.value.username,
        this.form.value.password)
      .then(() => {
        loader.dismiss();
        this.navCtrl.setRoot(TabsPage);
      })
      .catch(() => {
        loader.dismiss();
        this.utils.alert('Nome de usuário ou senha inválidos.', 'Autenticação inválida');
      });

  }

  ionViewDidLoad() {
    let loader = this.utils.showLoading();
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.navCtrl.setRoot(TabsPage);
      }
      loader.dismiss();
    });
  }

}
