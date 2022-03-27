import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorBase } from '../../control-value-accessor-base';

@Component({
  selector: 'nomination-create-step-2',
  templateUrl: './nomination-create-page-2.component.html',
  styleUrls: ['./nomination-create-page-2.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NominationCreatePage2Component,
      multi: true,
    },
  ],
})
export class NominationCreatePage2Component
  extends ControlValueAccessorBase
  implements OnInit
{
  balanceInfo: any = {
    balanced: true,
  };
  fg: FormGroup;
  constructor() {
    super();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.fg = new FormGroup({
      nominationHeader: new FormControl(),
      ledger: new FormControl(),
    });
  }

  handleBalanceChanged(data) {
    console.log('balance', data);
    this.balanceInfo = data;
  }
}
