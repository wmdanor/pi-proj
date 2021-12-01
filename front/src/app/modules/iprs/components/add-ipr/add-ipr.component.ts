import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Author, PublicationObjectType } from 'src/app/models/ipr';
import { IprService } from 'src/app/services/ipr.service';
import { PublicationOrigin } from 'src/app/models/ipr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ipr',
  templateUrl: './add-ipr.component.html',
  styleUrls: ['./add-ipr.component.scss']
})
export class AddIprComponent implements OnInit {

  objectTypes: PublicationObjectType[] = [];

  error = ''
  author: Author = {} as Author
  Authors: Author[] = []

  addIprForm : FormGroup = this.formBuilder.group({
    applicationNumber  : '',
    applicationDate  :  '',
    copyrightRegistrationNumber  :   '',
    copyrightRegistrationDate  :   '',
    certificateIssueDate  :   '',
    officialBulletinNumber  :   '',
    publicationSphereData  :   '',
    publicationTitle :   '',
    publicationAlternativeTitle  :   '',
    publicationOrigin  :   '',
    publicationCreationReason: '',
    publicationPublicData: '',
    paymentReceiptCode: '',
    publicationObjectTypeId: '',
    authors: this.formBuilder.array([
      this.formBuilder.group({
        firstName: '',
        lastName: '',
        patronymic: '',
        publicNameType: '',
        publicName: '',
        birthdate: '',
        postalAddress: ''
      })
    ])
  });

  constructor(private formBuilder: FormBuilder, private iprService: IprService, private router: Router) { }

  ngOnInit(): void {
    this.getObjectTypes();
  }

  onSubmit() {
    const ipr = this.addIprForm.value;
    this.iprService.addIpr(ipr)
      .subscribe(
        data => {
          console.log(data)
          this.router.navigate(['ipr/'+data.id])
        },
        error => alert(error)
      )
  }

  removeAuthor(){

  }

  get authors() {
    return this.addIprForm.get('authors') as FormArray;
  }

  addAuthor() {
    this.authors.push(this.formBuilder.group({
      firstName: '',
      lastName: '',
      patronymic: '',
      publicNameType: '',
      publicName: '',
      birthdate: '',
      postalAddress: ''
    }));
  }

  popAuthors(index: number) {
    this.authors.removeAt(index)
  }

  getObjectTypes(){
    this.iprService.getoObjectTypes()
      .subscribe(
        objectTypes => {
          this.objectTypes = objectTypes;
        },
        error => {
          console.error(error)
        });
  }
}
