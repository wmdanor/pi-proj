import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrarsService } from 'src/app/services/registrars.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    organizationName  :   '',
    organizationAddressCity: '',
    organizationAddressDistrict: '',
    organizationAddressStreet: '',
    organizationAddressHouse: '',
    organizationPosition  :   '',
  });

  constructor(private route: ActivatedRoute, private registrarService: RegistrarsService, private formBuilder: FormBuilder, private router : Router) { }

  ngOnInit(): void {
    this.idFromUrl();
    this.registrarService.getRegistrarById(this.id)
      .subscribe(
        data => {
          this.registrar = data;
          this.registrar.organizationName  =data.organization.name,
          this.registrar.organizationAddressCity=data.organization.addressCity,
          this.registrar.organizationAddressDistrict=data.organization.addressDistrict,
          this.registrar.organizationAddressStreet=data.organization.addressStreet,
          this.registrar.organizationAddressHouse=data.organization.addressHouse,
          
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
      organizationName  :    this.registrar.organizationName,
      organizationAddressCity:  this.registrar.organizationAddressCity,
      organizationAddressDistrict:  this.registrar.organizationAddressDistrict,
      organizationAddressStreet:  this.registrar.organizationAddressStreet,
      organizationAddressHouse:  this.registrar.organizationAddressHouse,
      organizationPosition  :    this.registrar.organizationPosition,
    });
  }

  onSubmit(){
    const fullname = this.addRegistrarFrom.value.fullName.split(' ')
    if (!fullname[0] || !fullname[1] || !fullname[2]){alert('Вкажіть ПОвне ПІВ')}
    const organization ={
      id: this.registrar.organizationId,
      name: this.addRegistrarFrom.value.organizationName,
      addressCity: this.addRegistrarFrom.value.organizationAddressCity,
      addressDistrict: this.addRegistrarFrom.value.organizationAddressDistrict,
      addressStreet: this.addRegistrarFrom.value.organizationAddressStreet,
      addressHouse: this.addRegistrarFrom.value.organizationAddressHouse,
    }

    
    const data ={
      firstName: fullname[0],
      lastName: fullname[1],
      patronymic: fullname[2],
      passportSeries: this.addRegistrarFrom.value.passportSeries ,
      passportNumber: this.addRegistrarFrom.value.passportNumber,
      passportAuthority: this.addRegistrarFrom.value.passportAuthority,
      passportIssueDate: this.addRegistrarFrom.value.passportIssueDate,
      organizationId: this.registrar.organizationId,
      organizationPosition  :    this.addRegistrarFrom.value.organizationPosition,
      organization: {}
    }
    data.organization = organization;
    console.log(data)
    return this.registrarService.editRegistrar(data, this.id)
      .subscribe(
        data => {this.router.navigate(['registrar/'+data.data.id])},
        error => {console.error(error)}
      )
  }
}
