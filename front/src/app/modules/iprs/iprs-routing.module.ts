import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddIprComponent } from './components/add-ipr/add-ipr.component';
import { EditIprComponent } from './components/edit-ipr/edit-ipr.component';
import { IprComponent } from './components/ipr/ipr.component';
import { IprsComponent } from './components/iprs/iprs.component';

const routes: Routes = [
  { path: '', component: IprsComponent },
  { path: ':id', component: IprComponent},
  { path: 'add', component: AddIprComponent },
  { path: 'edit/:id', component: EditIprComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IprsRoutingModule { }
