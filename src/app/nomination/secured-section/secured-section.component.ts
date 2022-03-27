import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { base_template } from '../../base-template';
import { FormGeneratorComponent } from '../../index';
import { SecurityService } from '../../shared/security.service';
import { ControlType, SmartFormControl } from '../../shared/types';

@Component({
  selector: 'app-secured-section',
  template: `${base_template}`,
  styleUrls: ['./secured-section.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SecuredSectionComponent,
      multi: true,
    },
  ],
})
export class SecuredSectionComponent
  extends FormGeneratorComponent
  implements OnInit
{
  constructor(private sec: SecurityService) {
    super();
  }

  ngOnInit() {
    this.createForm();
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.layout =
      changes.securityContext.currentValue.role === 'admin'
        ? 'admin-layout'
        : 'user-layout';

    console.log('changes', changes, this.layout);
  }

  createForm() {
    this.fg = new FormGroup({
      user: new SmartFormControl({
        caption: 'Admin',
        type: ControlType.TextBox,
        showWhen: () => this.securityContext.role === 'admin',
      }),
      admin: new SmartFormControl({
        caption: 'User',
        type: ControlType.TextBox,
        showWhen: () =>
          this.securityContext.role === 'user' ||
          this.securityContext.role === 'admin',
      }),
    });
  }
}
