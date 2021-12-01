import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author, Ipr, PublicationObjectType } from 'src/app/models/ipr';
import { IprService } from 'src/app/services/ipr.service';

@Component({
  selector: 'app-edit-ipr',
  templateUrl: './edit-ipr.component.html',
  styleUrls: ['./edit-ipr.component.scss']
})
export class EditIprComponent implements OnInit {
  id: string = '';
  ipr = {} as Ipr;
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

  constructor(
    private route: ActivatedRoute, 
    private iprService: IprService, 
    private formBuilder: FormBuilder,
    private router: Router
    ) { 

  }
  ngOnInit(): void {
    this.getObjectTypes();
    this.idFromUrl();
    this.iprService.getIprbyId(this.id)
      .subscribe(
        data => {
          this.ipr = data.data;
          this.refreshForm()
        },
        error => {
          console.log(error)
        });
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
  


  addCurrentAuthor(author: Author) {
    const {birthdate, ...other} = author
    
    this.authors.push(this.formBuilder.group({
      ...other,
      birthdate: birthdate.substr(0, 10)
    }));
  }

  popAuthors(index: number) {
    this.authors.removeAt(index)
  }

  

  idFromUrl() {
    this.route.params.subscribe(params => this.id = params.id);
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
  
  onSubmit() {
    console.log(this.addIprForm.value)
    const ipr = this.addIprForm.value;
    this.iprService.editIpr(ipr, this.id)
      .subscribe(
        data => {
          this.router.navigate(['ipr'])
        },
        error => alert(error)
      )
  }
  refreshForm() {
    this.addIprForm = this.formBuilder.group({
      applicationNumber  : this.ipr.applicationNumber,
      applicationDate  :  this.ipr.applicationDate?.substr(0, 10),
      copyrightRegistrationNumber  :   this.ipr.copyrightRegistrationNumber,
      copyrightRegistrationDate  :   this.ipr.copyrightRegistrationDate?.substr(0, 10),
      certificateIssueDate  :   this.ipr.certificateIssueDate?.substr(0, 10),
      officialBulletinNumber  :   this.ipr.officialBulletinNumber,
      publicationSphereData  :   this.ipr.publicationSphereData,
      publicationTitle :   this.ipr.publicationTitle,
      publicationAlternativeTitle  :   this.ipr.publicationAlternativeTitle,
      publicationOrigin  :   this.ipr.publicationOrigin,
      publicationCreationReason: this.ipr.publicationCreationReason,
      publicationPublicData: this.ipr.publicationPublicData,
      paymentReceiptCode: this.ipr.paymentReceiptCode,
      publicationObjectTypeId: this.ipr.publicationObjectTypeId,
      authors: this.formBuilder.array([])
    });
    this.ipr.authors?.forEach(element => {
      this.addCurrentAuthor(element)
    });
  }

}
