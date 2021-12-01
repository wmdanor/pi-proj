import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RegistrarsService } from 'src/app/services/registrars.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-registrars',
  templateUrl: './registrars.component.html',
  styleUrls: ['./registrars.component.scss']
})
export class RegistrarsComponent implements OnInit {
  currentUser?: User;
  searchRegistrarForm: FormGroup = this.formBuilder.group({
    data: [''] 
  });
  registrars: User[] = [];
  loading = true;


  pageIndex = 0;
  pageSize = 10;
  offset = 0;
  count = 1;
  q = '';
  
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    private authService: AuthenticationService,  
    private router: Router, 
    private formBuilder: FormBuilder, 
    private registrarsService: RegistrarsService,
  ) { 
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {
    this.loading = true;
    this.registrarsService.getRegistrars('', 10, 0)
      .subscribe(
        data => {
          this.loading = false;
          this.registrars = data.data;
          this.countRegistrars('');
        },
        error => {
          this.loading = false;
          console.log(error)
        });
  }



  countRegistrars(str: string){
    this.registrarsService.getRegistrarsCount(str)
      .subscribe(
        data => {
          this.count = data.count;
        },
        error => {
          console.log(error)
        });
  }

  searchRegistrar(): void {
    this.registrarsService.getRegistrars(this.searchRegistrarForm.value.data, this.pageSize, 0)
      .subscribe(
        data => {
          this.registrars = data.data;
          this.countRegistrars(this.searchRegistrarForm.value.data);
          this.paginator?.firstPage()
        },
        error => {
          console.log(error)
        });      
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.pageSize = event.pageSize;
    this.offset = event.pageIndex*event.pageSize;
    this.registrarsService.getRegistrars(this.searchRegistrarForm.value.data, event.pageSize, event.pageIndex*event.pageSize)
        .subscribe(
          data => {
            this.registrars = data.data;
            this.countRegistrars(this.searchRegistrarForm.value.data);
          },
          error => {
            console.log(error)
          });
    return event;
  }
 
  goToRegistrar(userId: string){
    this.router.navigate(['registrar/'+userId])
  }

  addRegistrar(): void {
    this.router.navigate([`registrar/add`]);
  }

  editRegistrar(id: string): void {
    this.router.navigate([`registrar/edit/${id}`]);
  }

  
  isAdmin(): boolean | undefined {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
}
