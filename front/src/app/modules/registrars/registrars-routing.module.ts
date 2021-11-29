import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddRegistrarComponent } from './components/add-registrar/add-registrar.component';
import { EditRegistrarComponent } from './components/edit-registrar/edit-registrar.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { RegistrarsComponent } from './components/registrars/registrars.component';

const routes: Routes = [
  { path: '', component: RegistrarsComponent },
  
  { path: 'add', component: AddRegistrarComponent },
  { path: ':id', component: RegistrarComponent },
  { path: 'edit/:id', component:EditRegistrarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarsRoutingModule { }
