import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RegistrarsService } from 'src/app/services/registrars.service';

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
  currentPage = 1;
  pages = 1;

  constructor(
    private authService: AuthenticationService,  
    private router: Router, 
    private formBuilder: FormBuilder, 
    private registrarsService: RegistrarsService
  ) { 
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {
    this.loading = true;
    this.registrarsService.getRegistrars(10,0)
      .subscribe(
        data => {
          this.loading = false;
          this.registrars = data.data;
        },
        error => {
          this.loading = false;
          console.log(error)
        });
  }

  isAdmin(): boolean | undefined {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  addRegistrar(): void {
    this.router.navigate([`registrar/add`]);
  }

  editRegistrar(id: string): void {
    this.router.navigate([`registrar/edit/${id}`]);
  }

  searchRegistrar(): void {
    if(this.searchRegistrarForm.value.data !== ''){
      console.log(this.searchRegistrarForm.value)
    }
  }

  goToUser(userId: string){

  }

  nextPage(){
    if (this.currentPage !== this.pages){
      this.currentPage += 1
    }
  }

  prevPage(){
    if (this.currentPage != 1){
      this.currentPage -= 1;
    }
    
  }

}
