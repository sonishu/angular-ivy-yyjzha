import { Component, OnInit } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { of } from 'rxjs';
import { base_template } from '../../base-template';

import {
  ControlType,
  SmartFormControl,
  FormGeneratorComponent,
} from '../../index';

@Component({
  selector: 'order-item',
  template: `${base_template}`,
  styleUrls: ['./order-item.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: OrderItemComponent,
      multi: true,
    },
  ],
})
export class OrderItemComponent
  extends FormGeneratorComponent
  implements OnInit
{
  constructor() {
    super();
  }

  ngOnInit() {
    this.createForm();
    super.ngOnInit();
  }

  ngOnDistroy() {
    super.ngOnDistroy();
  }

  createForm() {
    this.fg = new FormGroup({
      facility: new SmartFormControl({
        caption: 'Facility',
        type: ControlType.DropDown,
        options: of(['Facility-1', 'Facility-2']),
      }),
      product: new SmartFormControl({
        caption: 'Product',
        type: ControlType.DropDown,
        options: of(['Product-1', 'Product-2']),
      }),
      quantity: new SmartFormControl({
        caption: 'Qty',
        type: ControlType.TextBox,
      }),
    });
  }
}
