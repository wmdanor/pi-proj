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
    email  : [{value: '', disabled: true }, [ Validators.required, Validators.email ]],
    fullName  :  ['', [ Validators.required ]] ,
    birthDate  :   {value: '', disabled: true },
    passportSeries  :   '',
    passportNumber  :   '',
    passportIssueDate  :   '',
    passportAuthority  :   '',
    inn :   {value: '', disabled: true },
    organizationId  :   {value: '', disabled: true },
    organizationPosition  :   {value: '', disabled: true },
  });

  constructor(private route: ActivatedRoute, private registrarService: RegistrarsService, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.idFromUrl();
    this.registrarService.getRegistrarById(this.id)
      .subscribe(
        data => {
          this.registrar = data;
          console.log(this.registrar)
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
      email  :                this.registrar.email,
      fullName  :             fullName,  
      birthDate  :            this.registrar.birthDate.substr(0, 10),
      passportSeries  :       this.registrar.passportSeries,
      passportNumber  :       this.registrar.passportNumber,
      passportIssueDate  :    this.registrar.passportIssueDate.substr(0, 10),
      passportAuthority  :    this.registrar.passportAuthority,
      inn :                   this.registrar.inn ,
      organizationId  :       this.registrar.organizationId ,
      organizationPosition  :  this.registrar.organizationPosition ,
    });
  }

  onSubmit(){
    const fullname = this.addRegistrarFrom.value.fullName.split(' ')
    if (!fullname[0] || !fullname[1] || !fullname[2]){alert('Вкажіть ПОвне ПІВ')}
    const data ={
      firstName: fullname[0],
      lastName: fullname[1],
      patronymic: fullname[2],
      passportSeries: this.addRegistrarFrom.value.passportSeries ,
      passportNumber: this.addRegistrarFrom.value.passportNumber,
      passportAuthority: this.addRegistrarFrom.value.passportAuthority,
      passportIssueDate: this.addRegistrarFrom.value.passportIssueDate
    }
    return this.registrarService.editRegistrar(data, this.id)
      .subscribe(
        data => {},
        error => {console.error(error)}
      )
  }
}
