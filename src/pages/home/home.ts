import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    document.querySelector('body').classList.remove('dark-theme');
  }


  clickMe() {
    fetch("https://httpbin.org/anything")
      .then((e) => {
        console.log("did the job", e);
      })
      .catch((ex) => {
        console.exception("failed", ex);
      });
  }
}
