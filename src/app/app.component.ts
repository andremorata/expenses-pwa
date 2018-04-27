import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { Utilities, SysVariables } from '../services/utils.service';
import { Settings } from '../services/settings.service';
import { DataService } from '../services/data.service';

@Component({
  templateUrl: 'app.html',
  providers: [Utilities, DataService]
})

@Component({
  templateUrl: 'app.html'
})
export class AppMain {
  rootPage:any = LoginPage;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public utils: Utilities,
    public sysVariables: SysVariables,
    public dataSvc: DataService,
    public settings: Settings
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // statusBar.styleDefault();
      // splashScreen.hide();
      this.dataSvc
        .loadConfigurationFile()
        .subscribe(result => {
          this.sysVariables.save(result);
        }, err => {
          this.utils.toast('Houve uma falha ao recuperar as configurações do sistema.\n' +
            'Por favor, recarregue a aplicação. Se o problema persistir, contate o suporte.');
        });
    });
  }
}
