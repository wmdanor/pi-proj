import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IprService } from 'src/app/services/ipr.service';

import { Ipr } from 'src/app/models/ipr';

@Component({
  selector: 'app-iprs',
  templateUrl: './iprs.component.html',
  styleUrls: ['./iprs.component.scss']
})
export class IprsComponent implements OnInit {
  error: Error = {name: 'iprsLoadingError', message: 'сталась помилка при отриманні ПІВ: '};
  iprs:Ipr[] = [];
  loading = true;
  errorOccured = false;

  constructor(
    private router: Router, 
    private iprService: IprService
  ) { }

  ngOnInit(): void {
    this.iprService.getIprs()
      .subscribe(
        data => {
          this.loading = false;
          this.iprs = data;
        },
        error => {
          this.loading = false;
          this.showError(error)
        });
  }

  goToIpr(iprId: string | undefined) {
    this.router.navigate([`ipr/${iprId}`]);
  }

  showError(error: Error): void {
    this.error.message += error;
    this.errorOccured = true;
  }

}
