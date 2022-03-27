import { Component, VERSION } from '@angular/core';
import { Person, Payment } from '../meta-data';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  personMetaData = Person;
  paymentMetaData = Payment;

  ngOnInit() {
    console.log('p', this.personMetaData);
  }
}
