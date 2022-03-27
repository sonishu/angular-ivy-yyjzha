import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  SecurityContext,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SecurityService } from '../shared/security.service';
import { NominationDataService } from './services/nomination-data.service';

@Component({
  selector: 'create-nomination',
  templateUrl: './nomination.component.html',
  styleUrls: ['./nomination.component.css'],
  providers: [NominationDataService],
})
export class NominationComponent implements OnInit {
  @Output() stepChanged: EventEmitter<number> = new EventEmitter();
  fg: FormGroup;
  step = 1;
  constructor(private securityContext: SecurityService) {
    this.fg = new FormGroup({
      step1: new FormControl(),
      step2: new FormControl(),
    });
  }

  ngOnInit() {}

  handleNext() {
    this.step = 2;
    let nomHeader = this.fg.get('step1').value.nominationHeader;
    this.fg.get('step2').patchValue({
      nominationHeader: nomHeader,
      ledger: null,
    });
    this.stepChanged.emit(2);
  }
  handlePrevious() {
    this.step = 1;
    this.stepChanged.emit(1);
  }

  changeSecurityContext(data) {
    this.changeSecurityContext({
      role: data,
    });
  }
}
