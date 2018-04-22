import { Component } from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})
export class FooterComponent {

  public year: string = '2017';

  constructor() {
    this.year = new Date().getFullYear().toString();
  }
}
