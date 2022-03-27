import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'projector',
  templateUrl: './projector.component.html',
  styleUrls: ['./projector.component.css'],
})
export class ProjectorComponent implements OnInit {
  @Input() index;
  @ContentChild(TemplateRef) template: TemplateRef<any>;
  t: TemplateRef<any>;
  constructor() {}

  ngOnInit() {}
}
