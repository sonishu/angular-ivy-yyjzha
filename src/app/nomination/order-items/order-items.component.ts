import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ControlValueAccessorBase } from '../../control-value-accessor-base';

@Component({
  selector: 'order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: OrderItemsComponent,
      multi: true,
    },
  ],
})
export class OrderItemsComponent
  extends ControlValueAccessorBase
  implements OnInit
{
  @Output() totalChanged: EventEmitter<number> = new EventEmitter();
  constructor() {
    super();
  }

  ngOnInit() {
    this.createForm();
  }
  ngOnDistroy() {}

  createForm() {
    this.fg = new FormGroup({
      items: new FormArray([]),
      total: new FormControl(),
    });

    (this.fg.get('items') as FormArray).valueChanges.subscribe((v) => {
      let total = this.getTotal(v);
      this.fg.controls.total.setValue(total);
      this.totalChanged.emit(total);
      console.log('total changed emit', total);
    });
  }

  getTotal(v: any[]) {
    console.log('calling getTotal');
    return v
      .map((v) => +v.quantity)
      .reduce((p, c) => {
        return p + c;
      });
  }
  addItem() {
    (this.fg.get('items') as FormArray).push(
      new FormControl({
        facility: '',
        product: '',
        quantity: 0,
      })
    );
  }

  removeItem(index: number) {
    (this.fg.get('items') as FormArray).removeAt(index);
  }

  getItems() {
    return (this.fg.get('items') as FormArray).controls as FormControl[];
  }
}
