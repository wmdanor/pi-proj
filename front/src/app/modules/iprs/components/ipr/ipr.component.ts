import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IprService } from 'src/app/services/ipr.service';

import { Ipr } from 'src/app/models/ipr';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-ipr',
  templateUrl: './ipr.component.html',
  styleUrls: ['./ipr.component.scss']
})
export class IprComponent implements OnInit {
  id: string = '';
  currentUser?: User;
  applicationDate? ='';
  copyrightRegistrationDate? ='';
  certificateIssueDate? ='';
  publicationOrigin? =''
  ipr: Ipr = {};
  authors = []
  logged = false;
  constructor(
    private route: ActivatedRoute, 
    private iprService: IprService,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {this.authenticationService.currentUser.subscribe(x => this.currentUser = x); }

  ngOnInit(): void {
    if (this.currentUser?.accessToken !== undefined && this.currentUser.accessToken !== ''){
      this.logged = true;
    }
    console.log(this.isAdmin())
    this.idFromUrl();
    this.iprService.getIprbyId(this.id)
      .subscribe(
        data => {
          this.ipr = data.data;
          this.createInfo();
          console.log(this.ipr)
        },
        error => {
          console.log(error)
        });
  }

  idFromUrl() {
    this.route.params.subscribe(params => this.id = params.id);
    
  }

  createInfo(){
    this.applicationDate = this.ipr.applicationDate?.substr(0, 10);
    this.copyrightRegistrationDate = this.ipr.copyrightRegistrationDate?.substr(0, 10);
    this.certificateIssueDate = this.ipr.certificateIssueDate?.substr(0, 10);
    if(this.ipr.publicationOrigin?.Derivative) {
      this.publicationOrigin = 'похідний';
    } else {
      this.publicationOrigin = 'не похідний';
    }
  }

  editIpr(){
    this.router.navigate(['ipr/edit/'+this.id])
  }

  isAdmin(): boolean | undefined {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  isRegistrar(): boolean | undefined {
    return this.currentUser && this.currentUser.role === Role.Registrar;
  }

}
