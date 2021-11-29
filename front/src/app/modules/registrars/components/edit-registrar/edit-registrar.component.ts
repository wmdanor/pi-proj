import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrarsService } from 'src/app/services/registrars.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-edit-registrar',
  templateUrl: './edit-registrar.component.html',
  styleUrls: ['./edit-registrar.component.scss']
})
export class EditRegistrarComponent implements OnInit {
  id: string = '';
  registrar = {} as User;
  

  addRegistrarFrom : FormGroup = this.formBuilder.group({
    email  : ['', [ Validators.required, Validators.email ]],
    fullName  :  ['', [ Validators.required ]] ,
    birthDate  :   '',
    passportSeries  :   '',
    passportNumber  :   '',
    passportIssueDate  :   '',
    passportAuthority  :   '',
    inn :   '',
    organizationId  :   '',
    organizationPosition  :   '',
  });

  constructor(private route: ActivatedRoute, private registrarService: RegistrarsService, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.idFromUrl();
    this.registrarService.getRegistrarById(this.id)
      .subscribe(
        data => {
          this.registrar = data;
          this.refreshForm()
        },
        error => {
          console.log(error)
        });
    
  }

  idFromUrl() {

    this.route.params.subscribe(params => this.id = params.id);
    
  }

  refreshForm() {
    
    const fullName: string = `${this.registrar.lastName} ${this.registrar.firstName} ${this.registrar.patronymic}`
    this.addRegistrarFrom = this.formBuilder.group({
      email  : [this.registrar.email, [ Validators.required, Validators.email ]],
      fullName  :  [fullName, [ Validators.required ]] ,
      birthDate  :   '',
      passportSeries  :   this.registrar.passportSeries,
      passportNumber  :   this.registrar.passportNumber,
      passportIssueDate  :   '',
      passportAuthority  :   this.registrar.passportAuthority,
      inn :   this.registrar.inn,
      organizationId  :   this.registrar.organizationId,
      organizationPosition  :   this.registrar.organizationPosition,
    });
  }

  onSubmit(){
    console.log('EDITED')
  }
}
