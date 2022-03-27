import { Component, OnInit } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { of } from 'rxjs';
import {
  FormGeneratorComponent,
  SmartFormControl,
  ControlType,
} from '../../index';
import { base_template } from '../../base-template';
import { NominationDataService } from '../services/nomination-data.service';

@Component({
  selector: 'marine-details',
  template: `${base_template}`,
  styleUrls: ['./marine-details.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MarineDetailsComponent,
      multi: true,
    },
  ],
})
export class MarineDetailsComponent
  extends FormGeneratorComponent
  implements OnInit
{
  constructor(private nominationService: NominationDataService) {
    super();
  }

  ngOnInit() {
    this.createForm();
    super.ngOnInit();
  }

  createForm() {
    this.fg = new FormGroup({
      vessel: new SmartFormControl({
        caption: 'Vessel',
        type: ControlType.DropDown,
        options: this.nominationService.vessels$,
        onChange: this.updateVesselLength.bind(this),
      }),
      length: new SmartFormControl({
        caption: 'Length',
        type: ControlType.TextBox,
        readonlyWhen: () => true,
      }),
    });
  }

  updateVesselLength(v: string) {
    let length = this.nominationService.getVesselLength(v);
    console.log('vessel', length);
    this.fg.controls.length.setValue(length);
  }
}
