import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { RegistrarsService } from 'src/app/services/registrars.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
  registrar = {} as User;
  id = '';
  loading = true;
  fullName = ''
  constructor(private route: ActivatedRoute, private registrarService: RegistrarsService) { }

  ngOnInit(): void {
    this.idFromUrl();
    this.registrarService.getRegistrarById(this.id)
      .subscribe(
        data => {
          this.registrar = data;
          console.log(this.registrar.isActive)
          this.fullName = `${this.registrar.lastName} ${this.registrar.firstName} ${this.registrar.patronymic}`
          this.registrar.birthDate = this.registrar.birthDate.substr(0, 10);
          this.registrar.passportIssueDate = this.registrar.passportIssueDate.substr(0, 10);
        },
        error => {
          console.log(error)
        });
    
  }

  idFromUrl() {
    this.route.params.subscribe(params => this.id = params.id);
  }

  toggleIsActive() {
    this.registrarService.activateRegistrar(!this.registrar.isActive, this.registrar.id)
    .subscribe(
      data => {
        this.registrar.isActive = !this.registrar.isActive;
        console.log(data)
      },
      error => {
        console.log(error)
      }
    );
  }

}
