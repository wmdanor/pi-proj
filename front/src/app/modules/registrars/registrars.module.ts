import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarsRoutingModule } from './registrars-routing.module';
import { RegistrarsComponent } from './components/registrars/registrars.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AddRegistrarComponent } from './components/add-registrar/add-registrar.component';
import { EditRegistrarComponent } from './components/edit-registrar/edit-registrar.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    RegistrarComponent,
    RegistrarsComponent,
    AddRegistrarComponent,
    EditRegistrarComponent,
  ],
  imports: [
    CommonModule,
    RegistrarsRoutingModule,
    ReactiveFormsModule,
    MatPaginatorModule,
  ],


})
export class RegistrarsModule { }
