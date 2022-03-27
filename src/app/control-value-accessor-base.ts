import { ControlValueAccessor, FormGroup } from '@angular/forms';

export class ControlValueAccessorBase implements ControlValueAccessor {
  fg: FormGroup;
  onTouchedCallBack: Function;
  constructor() {}
  writeValue(obj: any): void {
    if (obj) {
      this.fg.setValue(obj);
    }
  }
  registerOnChange(fn: any): void {
    this.fg.valueChanges.subscribe((v) => fn(v));
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
}
