import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser?: User;
  logged: boolean = false;
  message = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private data: DataService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  
  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => {
      if (message === "Logged in!") this.logged = true;
    })
    if (this.currentUser?.accessToken !== undefined && this.currentUser.accessToken !== ''){
      this.logged = true;
    }
  }

  isAdmin(): boolean | undefined {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logOut(): void{
    this.logged = false;
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  logIn(): void{
    this.router.navigate(['/login']);
  }

}
