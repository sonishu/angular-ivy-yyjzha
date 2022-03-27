import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { ContractService } from '../../shared/contract.service';
import { MasterDataService } from '../../shared/master-data.service';

@Injectable({
  providedIn: 'root',
})
export class NominationDataService {
  private customerSubject: BehaviorSubject<string[]> = new BehaviorSubject([]);
  customers$ = this.customerSubject.asObservable();

  private contractSubject: BehaviorSubject<string[]> = new BehaviorSubject([]);
  contracts = this.contractSubject.asObservable();

  private typeSubject: BehaviorSubject<string[]> = new BehaviorSubject([]);
  types$ = this.typeSubject.asObservable();

  constructor(
    private masterDataService: MasterDataService,
    private contractService: ContractService
  ) {}

  filterCustomers(assetGroup: string) {
    this.customerSubject.next(this.masterDataService.getCustomer(assetGroup));
    this.filterContracts(null, null, null);
  }
  filterContracts(customer, startDate, endDate) {
    this.contractSubject.next(
      this.contractService.getContracts(customer, startDate, endDate)
    );
    this.filterTypes(null);
  }
  filterTypes(contract: string) {
    this.typeSubject.next(this.masterDataService.getTypes(contract));
  }

  get assetGroup$(): Observable<string[]> {
    return of(this.masterDataService.getAssetGroup());
  }

  get vessels$(): Observable<string[]> {
    return of([...this.masterDataService.vessels.map(v => v.vessel)]);
  }

  getVesselLength(vessel): string {
    return this.masterDataService.getVesselLength(vessel)
  }
}
