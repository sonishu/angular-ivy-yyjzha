import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { ProjectorComponent } from '../projector/projector.component';
import { SmartFormControl } from '../../index';

@Component({
  selector: 'app-form-generator',
  template: '',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormGeneratorComponent
  implements OnInit, ControlValueAccessor, Validator
{
  @Input() securityContext: { role: 'admin' | 'user' };
  @Input() isReadOnly = false;
  @Output() valueChanged: EventEmitter<{ control: string; value: any }> =
    new EventEmitter();

  @ContentChildren(ProjectorComponent, { descendants: true })
  projectors: QueryList<ProjectorComponent>;

  controls: SmartFormControl[] = [];
  takeUntil: Subject<any> = new Subject();
  layout = 'layout';

  fg: FormGroup;

  onChangeSubs: Subscription[] = [];

  onTouchedCallBack = (value: any) => {};

  constructor() {}

  validate(control: AbstractControl): ValidationErrors {
    if (!this.fg.errors) {
      return this.fg.errors;
    } else {
      return null;
    }
  }
  registerOnValidatorChange?(fn: () => void): void {
    //throw new Error('Method not implemented.');
  }

  writeValue(obj: any): void {
    console.log('value written');
    if (obj) {
      this.fg.setValue(obj);
    }
  }
  public registerOnChange(fn: any): void {
    console.log('onchange registered');
    const sub = this.fg.valueChanges.subscribe((v) => fn(v));
    this.onChangeSubs.push(sub);
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallBack = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.fg.disable();
    } else {
      this.fg.enable();
    }
  }

  ngOnInit() {
    console.log('layout', this.layout);
    Object.keys(this.fg.controls).forEach((k) =>
      this.fg
        .get(k)
        .valueChanges.pipe(takeUntil(this.takeUntil))
        .subscribe((v) => {
          console.log('firing', k, v);
          this.valueChanged.emit({
            control: k,
            value: v,
          });
        })
    );
  }

  ngOnDistroy() {
    this.onChangeSubs.forEach((s) => s.unsubscribe());
    this.takeUntil.next(true);
  }

  getControls() {
    this.controls = [];
    Object.keys(this.fg.controls).forEach((key) =>
      this.controls.push(this.fg.get(key) as SmartFormControl)
    );

    return this.controls;
  }

  getValue(value) {
    let returned: any;
    switch (typeof value) {
      case 'function': {
        returned = value();
        break;
      }
      default: {
        returned = value;
      }
    }

    return returned;
  }

  getControlValue(controlKey) {
    return this.fg.get(controlKey).value;
  }

  getSafePropertyValue(controlIndex, attribute) {
    let returnValue;
    switch (
      typeof (this.fg.controls[controlIndex] as SmartFormControl).e[attribute]
    ) {
      case 'function': {
        returnValue = (this.fg.controls[controlIndex] as SmartFormControl).e[
          attribute
        ]();
      }
      default: {
        returnValue = (this.fg.controls[controlIndex] as SmartFormControl).e[
          attribute
        ];
      }
    }
  }

  shouldShowEditableControl(ctrl: SmartFormControl) {
    // !this.isReadOnly && (ctrl.e.showWhen ? ctrl.e.showWhen() : true);
  }

  getProjectedTemplateAtPosition(i) {
    let p = this.projectors.toArray().filter((p) => p.index == i);
    // console.log('pp', p[0]?.index);

    return p && p.length > 0 ? p[0] : null;
  }
  ngAfterContentInit() {
    // console.log('asdasd', this.projectors.toArray().length);
  }
}
