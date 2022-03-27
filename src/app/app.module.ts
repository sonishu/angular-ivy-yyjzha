import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { TabMenuModule } from 'primeng/tabmenu';
import { RouterModule } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';

import { PanelModule } from 'primeng/panel';

import {
  FormGeneratorComponent,
  MarineDetailsComponent,
  NominationComponent,
  NominationHeaderComponent,
  SecuredSectionComponent,
  NominationCreatePage1Component,
  ProjectorComponent,
  OrderItemsComponent,
  OrderItemComponent,
  LedgerComponent,
  NominationCreatePage2Component,
} from './index';

import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    TabMenuModule,
    BrowserAnimationsModule,
    TabViewModule,
    CalendarModule,
    PanelModule,

    DropdownModule,

    RouterModule.forRoot([{ path: '', component: AppComponent }]),
  ],
  declarations: [
    AppComponent,
    FormGeneratorComponent,
    NominationHeaderComponent,
    SecuredSectionComponent,
    MarineDetailsComponent,
    NominationComponent,
    NominationCreatePage1Component,
    NominationCreatePage2Component,
    ProjectorComponent,
    OrderItemComponent,
    OrderItemsComponent,
    LedgerComponent,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
