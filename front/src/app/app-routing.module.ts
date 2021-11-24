import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LogsComponent } from './components/logs/logs.component';
import { MainComponent } from './components/main/main.component';
import { RegistrarsComponent } from './components/registrars/registrars.component';
import { AuthGuard } from './helpers/auth.guard';
import { Role } from './models/role';
const routes: Routes = [
  { 
    path: 'home', 
    component: MainComponent
  },
  { 
    path: 'registrars', 
    component: RegistrarsComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  { 
    path: 'logs', 
    component: LogsComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
