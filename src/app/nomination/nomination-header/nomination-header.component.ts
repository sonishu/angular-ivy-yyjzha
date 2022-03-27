import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChange,
} from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { combineLatest, takeUntil } from 'rxjs';
import { combineLatestWith } from 'rxjs/operators';
import { base_template } from '../../base-template';
import { FormGeneratorComponent } from '../../index';
import { ControlType, SmartFormControl } from '../../shared/types';
import { NominationDataService } from '../services/nomination-data.service';

@Component({
  selector: 'app-nomination-header',
  template: `
  ${base_template}
 
  `,
  styleUrls: ['./nomination-header.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NominationHeaderComponent,
      multi: true,
    },
  ],
})
export class NominationHeaderComponent
  extends FormGeneratorComponent
  implements OnInit
{
  @Input()
  set vessel(value) {
    this.fg?.controls.vessel?.setValue(value);
  }
  constructor(
    private nominationService: NominationDataService,
    private datePipe: DatePipe
  ) {
    super();
  }

  ngOnInit() {
    this.layout = this.isReadOnly ? 'read-only-layout' : 'layout';
    this.createForm();
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChange) {
    this.layout =
      changes['isReadOnly']?.currentValue === true
        ? 'read-only-layout'
        : 'layout';

    console.log('changes', changes, this.layout);
  }

  ngOnDistroy() {
    super.ngOnDistroy();
  }

  createForm() {
    this.fg = new FormGroup({
      assetGroup: new SmartFormControl({
        type: ControlType.DropDown,
        caption: 'AssetGroup:',
        options: this.nominationService.assetGroup$,
        onChange: this.nominationService.filterCustomers.bind(
          this.nominationService
        ),
      }),
      // custom: new SmartFormControl({
      //   caption: 'Custom',
      //   type: ControlType.Injected,
      // }),
      customer: new SmartFormControl({
        type: ControlType.DropDown,
        caption: 'Customer:',
        options: this.nominationService.customers$,
      }),

      startDate: new SmartFormControl({
        caption: 'StartDate:',
        type: ControlType.Date,
        format: this.datePipe.transform,
      }),
      endDate: new SmartFormControl({
        caption: 'EndDate:',
        type: ControlType.Date,
        format: this.datePipe.transform,
      }),
      contract: new SmartFormControl({
        type: ControlType.DropDown,
        caption: 'Contract:',
        options: this.nominationService.contracts,
        onChange: this.nominationService.filterTypes.bind(
          this.nominationService
        ),
      }),
      type: new SmartFormControl({
        caption: 'Type:',
        type: ControlType.DropDown,
        options: this.nominationService.types$,
      }),
      vessel: new SmartFormControl({
        caption: 'Vessel:',
        type: ControlType.Label,
        showWhen: () => this.isReadOnly,
      }),
    });

    this.fg.controls.customer.valueChanges
      .pipe(
        combineLatestWith(
          this.fg.controls.startDate.valueChanges,
          this.fg.controls.endDate.valueChanges
        )
      )
      .subscribe((data) => {
        console.log('changed', data);
        this.nominationService.filterContracts(...data);
      });
  }
}






















