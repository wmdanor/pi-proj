import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http: HttpClient) { }
  
  getLogs(limit: number, offset: number) {
    return this.http.get<any>('http://localhost:3000/api/logs/ipr', {params: { limit: limit, offset: offset}})
      .pipe(map(data => {
          return data;
      }));
  }
}
