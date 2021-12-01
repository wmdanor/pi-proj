import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { filter, IprService } from 'src/app/services/ipr.service';

import { Ipr, PublicationObjectType } from 'src/app/models/ipr';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-iprs',
  templateUrl: './iprs.component.html',
  styleUrls: ['./iprs.component.scss']
})
export class IprsComponent implements OnInit {
  currentUser?: User;
  objectTypes: PublicationObjectType[] = [];
  filter: filter = {
    publicationTitle: '',
    authorName: '',
    copyrightRegistrationNumber: '',
    publicationObjectTypeId: '',
  }
  searchIprForm: FormGroup = this.formBuilder.group({
    publicationTitle: [''],
    authorName: [''],
    copyrightRegistrationNumber: [''],
    publicationObjectTypeId: ['']
  });
  error: Error = {name: 'iprsLoadingError', message: 'сталась помилка при отриманні ПІВ: '};
  iprs:Ipr[] = [];
  loading = true;
  errorOccured = false;

  pageIndex = 0;
  pageSize = 10;
  offset = 0;
  count = 1;
  q = '';

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    private iprService: IprService,
    private authService: AuthenticationService,  
    private router: Router, 
    private formBuilder: FormBuilder, 
  ) { 
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {
    this.iprService.getIprs(this.filter, 10, 0)
      .subscribe(
        data => {
          this.loading = false;
          this.iprs = data.data;
          this.getObjectTypes();
          this.countIprs('')
        },
        error => {
          this.loading = false;
          this.showError(error)
        });
  }

  getObjectTypes(){
    this.iprService.getoObjectTypes()
      .subscribe(
        objectTypes => {
          this.objectTypes = objectTypes;
        },
        error => {
          console.error(error)
        });
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.pageSize = event.pageSize;
    this.offset = event.pageIndex*event.pageSize;
    this.iprService.getIprs(this.searchIprForm.value, event.pageSize, event.pageIndex*event.pageSize)
        .subscribe(
          data => {
            this.iprs = data.data;
            this.countIprs(this.searchIprForm.value.data);
          },
          error => {
            console.log(error)
          });
    return event;
  }

  searchIpr(){
    this.iprService.getIprs(this.searchIprForm.value, this.pageSize, 0)
      .subscribe(
        data => {
          this.iprs = data.data;
          this.countIprs(this.searchIprForm.value);
          this.paginator?.firstPage()
        },
        error => {
          console.log(error)
        });    
   
  }

  addIpr(){

  }

  goToIpr(iprId: string | undefined) {
    this.router.navigate([`ipr/${iprId}`]);
  }

  showError(error: Error): void {
    this.error.message += error;
    this.errorOccured = true;
  }

  countIprs(str: string){
    this.iprService.getIprsCount(str)
      .subscribe(
        data => {
          this.count = data.count;
        },
        error => {
          console.log(error)
        });
  }
  isAdmin(): boolean | undefined {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }


  isRegistrar(): boolean | undefined {
    return this.currentUser && this.currentUser.role === Role.Registrar;
  }
  
}
