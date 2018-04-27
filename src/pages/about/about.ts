import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { Utilities, SysVariables } from '../../services/utils.service';
import { VersionNotes } from '../version-notes/version-notes';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [
    Utilities
  ]
})
export class AboutPage {

  isOnline: boolean = false;
  user: string = '';
  private firstOnlineCheck = true;

  constructor(
    public app: App,
    public navCtrl: NavController,
    public utils: Utilities,
    public sysVariables: SysVariables,
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user.email;
      }
    });

    this.utils.isOnline.subscribe(st => {
      if (!this.firstOnlineCheck)
        this.utils.toast(st ? 'Você está online novamente.' : 'Você está trabalhando offline.');
      this.firstOnlineCheck = false;
      this.isOnline = st;
    });

  }

  goToVersionNotes() {
    this.navCtrl.push(VersionNotes);
  }

  signout() {
    this.afAuth.auth.signOut();
    let nav = this.getNav();
    nav.setRoot(LoginPage);
  }

  getNav() {
    var navs = this.app.getRootNavs();
    if (navs && navs.length > 0) {
      return navs[0];
    }
    return this.app.getActiveNav();
  }

  forceRefresh() {
    this.utils.confirm(
      'Deseja realmente apagar todos os dados do app armazenados neste dispositivo e recarregar?',
      'Atenção!',
      () => {
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
      });
  }

}
