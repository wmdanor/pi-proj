import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registrars',
  templateUrl: './registrars.component.html',
  styleUrls: ['./registrars.component.scss']
})
export class RegistrarsComponent implements OnInit {
  searchRegistrarForm: FormGroup = this.formBuilder.group({
    data: [''] 
  });
  registrars:User[] = [];
  loading = true;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.loading = true;
    this.getAllUsers()
      .subscribe(
        data => {
          this.loading = false;
          this.registrars = data;
        },
        error => {
          this.loading = false;
          console.log(error)
        });
  }

  addRegistrar(): void {
    console.log('add registrar!!')
  }

  searchRegistrar(): void {
    if(this.searchRegistrarForm.value.data !== ''){
      console.log(this.searchRegistrarForm.value)
    }
  }

  getAllUsers(){
    return this.http.get<User[]>(`${environment.apiUrl}/users`)
    .pipe(map(users => {
        // login successful if there's a jwt token in the response
        

        return users;
    }));
  }

  goToUser(userId: string){

  }

}
