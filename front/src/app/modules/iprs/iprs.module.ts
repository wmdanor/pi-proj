import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

import { IprsRoutingModule } from './iprs-routing.module';

import { IprComponent } from './components/ipr/ipr.component';
import { IprsComponent } from './components/iprs/iprs.component';
import { AddIprComponent } from './components/add-ipr/add-ipr.component';
import { EditIprComponent } from './components/edit-ipr/edit-ipr.component';

@NgModule({
  declarations: [
    IprsComponent,
    IprComponent,
    AddIprComponent,
    EditIprComponent
  ],
  imports: [
    CommonModule,
    IprsRoutingModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ]
})
export class IprsModule { }
