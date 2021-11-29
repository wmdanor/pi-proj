import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-registrar',
  templateUrl: './add-registrar.component.html',
  styleUrls: ['./add-registrar.component.scss']
})
export class AddRegistrarComponent implements OnInit {

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

  constructor(private formBuilder: FormBuilder, ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.addRegistrarFrom.value)
  }

}
