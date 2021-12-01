import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LogsComponent } from './components/logs/logs.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './helpers/auth.guard';
import { Role } from './models/role';
const routes: Routes = [
  //all user pathes
  { 
    path: 'home', 
    component: MainComponent
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
  { 
    path: 'ipr', 
    loadChildren: () => import('./modules/iprs/iprs.module').then(m => m.IprsModule)
  },
  //only admin pathes
  { 
    path: 'registrar', 
    loadChildren: () => import('./modules/registrars/registrars.module').then(m => m.RegistrarsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] } 
  },
  { 
    path: 'logs', 
    component: LogsComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  { path: '**', redirectTo: 'ipr' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
