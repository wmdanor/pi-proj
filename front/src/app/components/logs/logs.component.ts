import { Component, OnInit, ViewChild } from '@angular/core';
import { LogsService } from 'src/app/services/logs.service';
import { IprUpdatesLog } from 'src/app/models/iprUpdatesLog'
import {MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  error: Error = {name: 'iprsLoadingError', message: 'сталась помилка при отриманні логів: '};
  loading = true;
  errorOccured = false;

  pageIndex = 0;
  pageSize = 10;
  offset = 0;
  count = 1;
  q = '';
  logs: IprUpdatesLog[] =[]

  @ViewChild(MatPaginator) paginator?: MatPaginator;


  constructor(private logsService: LogsService) { }

  ngOnInit(): void {
    this.logsService.getLogs(100,0)
    .subscribe(
      data => {this.loading = false;
        this.logs = data.data;
        this.count = this.logs.length;
        },
      error => {this.loading = false;
        this.showError(error)}
    )
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.pageSize = event.pageSize;
    this.offset = event.pageIndex*event.pageSize;
    this.logsService.getLogs(event.pageSize, event.pageIndex*event.pageSize)
        .subscribe(
          data => {
            this.logs = data.data;
          },
          error => {
            console.log(error)
          });
    return event;
  }

  showError(error: Error): void {
    this.error.message += error;
    this.errorOccured = true;
  }
}
