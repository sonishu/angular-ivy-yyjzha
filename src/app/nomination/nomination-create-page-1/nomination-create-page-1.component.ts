import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorBase } from '../../control-value-accessor-base';

@Component({
  selector: 'nomination-create-step-1',
  templateUrl: './nomination-create-page-1.component.html',
  styleUrls: ['./nomination-create-page-1.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NominationCreatePage1Component,
      multi: true,
    },
  ],
})
export class NominationCreatePage1Component
  extends ControlValueAccessorBase
  implements OnInit
{
  showMarineDetails: boolean = false;
  isReadOnly = false;
  vesselSelected: string;
  securityContext: { role: 'admin' | 'user' } = { role: 'admin' };
  constructor() {
    super();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.fg = new FormGroup({
      nominationHeader: new FormControl(),
      marineDetails: new FormControl(),
      securedSection: new FormControl(),
    });
  }
  nominationHeaderChanged(data) {
    if (data.control === 'type') {
      if (data.value === 'Marine') {
        this.showMarineDetails = true;
      } else {
        this.showMarineDetails = false;
      }
    }
  }
  vesselChanged(data) {
    if (data.control === 'vessel') {
      this.vesselSelected = data.value;
    }
  }
  handleChange(value) {
    this.isReadOnly = value === 'readonly' ? true : false;
  }
}
