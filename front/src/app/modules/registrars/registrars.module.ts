import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarsRoutingModule } from './registrars-routing.module';
import { RegistrarsComponent } from './components/registrars/registrars.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AddRegistrarComponent } from './components/add-registrar/add-registrar.component';
import { EditRegistrarComponent } from './components/edit-registrar/edit-registrar.component';

@NgModule({
  declarations: [
    RegistrarsComponent,
    AddRegistrarComponent,
    EditRegistrarComponent
  ],
  imports: [
    CommonModule,
    RegistrarsRoutingModule,
    ReactiveFormsModule
  ]
})
export class RegistrarsModule { }
