import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import moment = require('moment');
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  contracts = [
    {
      contract: 'Contract-1',
      customer: 'Customer-1',
      startDate: '01-01-2021',
      endDate: '12-31-2021',
      index: 1,
    },
    {
      contract: 'Contract-2',
      customer: 'Customer-2',
      startDate: '01-01-2022',
      endDate: '12-31-2022',
      index: 2,
    },
  ];
  constructor() {
    console.log('service sta', this.contracts);
  }
  getContracts(customer: string, startDate: Date, endDate: Date): string[] {
    console.log('customer', customer, this.contracts);
    let a = this.contracts
      .filter((c) => c.customer === customer)
      .map((c) => c.contract);

    console.log('asdasd', a);
    return a;
  }
}
