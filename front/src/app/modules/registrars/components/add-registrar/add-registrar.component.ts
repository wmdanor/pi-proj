import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    organizationId  :   '',
    organizationPosition  :   '',
  });

  constructor(private formBuilder: FormBuilder, private registrarsService: RegistrarsService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const fullname = this.addRegistrarForm.value.fullName.split(' ')
    const user = this.addRegistrarForm.value;
    user.firstName = fullname[0];
    user.lastName = fullname[1];
    user.patronymic = fullname[2];
    delete user.fullName
    delete user.organizationId
    delete user.organizationPosition
    
    this.registrarsService.addRegistrar(user)
      .subscribe(
        data => console.log(data),
        error => alert(error)
      )
    
  }

}
