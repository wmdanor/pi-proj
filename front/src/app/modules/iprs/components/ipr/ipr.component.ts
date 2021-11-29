import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IprService } from 'src/app/services/ipr.service';

import { Ipr } from 'src/app/models/ipr';

@Component({
  selector: 'app-ipr',
  templateUrl: './ipr.component.html',
  styleUrls: ['./ipr.component.scss']
})
export class IprComponent implements OnInit {
  id: string = '';
  ipr: Ipr = {};

  constructor(
    private route: ActivatedRoute, 
    private iprService: IprService
  ) { }

  ngOnInit(): void {
    this.idFromUrl();
    this.iprService.getIprbyId(this.id)
      .subscribe(
        data => {
          this.ipr = data;
        },
        error => {
          console.log(error)
        });
  }

  idFromUrl() {
    this.route.params.subscribe(params => this.id = params.id);
    
  }

}
