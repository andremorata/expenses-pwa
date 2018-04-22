import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { Utilities } from '../../services/utils.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [
    Utilities
  ]
})
export class AboutPage {

  public user: string = '';

  constructor(
    private app: App,
    public navCtrl: NavController,
    private utils: Utilities,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user.email;
      }
    });
  }

  signout() {
    this.afAuth.auth.signOut();
    let nav = this.getNav()
    nav.setRoot(LoginPage);
    // this.navCtrl.setRoot(LoginPage);
  }

  getNav() {
    var navs = this.app.getRootNavs();
    if (navs && navs.length > 0) {
      return navs[0];
    }
    return this.app.getActiveNav();
  }

  forceRefresh() {
    navigator.serviceWorker
      .getRegistrations()
      .then((regs) => {
        for (let i = 0; i < regs.length; i++) {
          regs[i].unregister();
        }
      });

    caches.keys()
      .then((keyList) => {
        return Promise.all(keyList.map((key) => {
          caches.delete(key);
        }));
      });

    this.utils.toast('Cache reiniciado. Aguarde enquanto o app é recarregado.');
    setTimeout(() => {
      location.href = '/';
    }, 2500);
  }

}
