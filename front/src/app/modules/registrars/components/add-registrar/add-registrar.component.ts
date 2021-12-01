import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrarsService } from 'src/app/services/registrars.service';

@Component({
  selector: 'app-add-registrar',
  templateUrl: './add-registrar.component.html',
  styleUrls: ['./add-registrar.component.scss']
})
export class AddRegistrarComponent implements OnInit {
  error = ''

  addRegistrarForm : FormGroup = this.formBuilder.group({
    email  : ['', [ Validators.required, Validators.email ]],
    fullName  :  ['', [ Validators.required ]] ,
    birthDate  :   '',
    passportSeries  :   '',
    passportNumber  :   '',
    passportIssueDate  :   '',
    passportAuthority  :   '',
    inn :   '',
    organizationName  :   '',
    organizationAddressCity: '',
    organizationAddressDistrict: '',
    organizationAddressStreet: '',
    organizationAddressHouse: '',
    organizationPosition  :   '',
  });

  constructor(private formBuilder: FormBuilder, private registrarsService: RegistrarsService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const fullname = this.addRegistrarForm.value.fullName.split(' ')
    const user = this.addRegistrarForm.value;
    user.firstName = fullname[0];
    user.lastName = fullname[1];
    user.patronymic = fullname[2];
    delete user.fullName
    const organization ={
      name: this.addRegistrarForm.value.organizationName,
      addressCity: this.addRegistrarForm.value.organizationAddressCity,
      addressDistrict: this.addRegistrarForm.value.organizationAddressDistrict,
      addressStreet: this.addRegistrarForm.value.organizationAddressStreet,
      addressHouse: this.addRegistrarForm.value.organizationAddressHouse,
    }
    delete user.organizationName
    delete user.organizationAddressCity
    delete user.organizationAddressDistrict
    delete user.organizationAddressStreet
    delete user.organizationAddressHouse
    user.organization = organization;
    console.log(user);
    this.registrarsService.addRegistrar(user)
      .subscribe(
        data => {console.log(data)
        this.router.navigate(['registrar/'+data.id])},
        error => alert(error)
      )
    
  }

}
