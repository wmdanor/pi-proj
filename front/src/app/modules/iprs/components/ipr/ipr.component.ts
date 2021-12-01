import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IprService } from 'src/app/services/ipr.service';

import { Ipr } from 'src/app/models/ipr';

@Component({
  selector: 'app-ipr',
  templateUrl: './ipr.component.html',
  styleUrls: ['./ipr.component.scss']
})
export class IprComponent implements OnInit {
  id: string = '';
  applicationDate? ='';
  copyrightRegistrationDate? ='';
  certificateIssueDate? ='';
  publicationOrigin? =''
  ipr: Ipr = {};
  authors = []
  constructor(
    private route: ActivatedRoute, 
    private iprService: IprService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idFromUrl();
    this.iprService.getIprbyId(this.id)
      .subscribe(
        data => {
          this.ipr = data.data;
          this.createInfo();
          console.log(this.ipr)
        },
        error => {
          console.log(error)
        });
  }

  idFromUrl() {
    this.route.params.subscribe(params => this.id = params.id);
    
  }

  createInfo(){
    this.applicationDate = this.ipr.applicationDate?.substr(0, 10);
    this.copyrightRegistrationDate = this.ipr.copyrightRegistrationDate?.substr(0, 10);
    this.certificateIssueDate = this.ipr.certificateIssueDate?.substr(0, 10);
    if(this.ipr.publicationOrigin?.Derivative) {
      this.publicationOrigin = 'похідний';
    } else {
      this.publicationOrigin = 'не похідний';
    }
  }

  editIpr(){
    this.router.navigate(['ipr/edit/'+this.id])
  }

}
