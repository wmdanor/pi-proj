import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrarsService {

  getRegistrarsUrl = `${environment.apiUrl.RecordersUrl}`; 
  getByIdUrl = `${environment.apiUrl.RecordersUrl}/`;

  constructor(private http: HttpClient) { }
  
  getRegistrars(limit: number, offset: number) {
    return this.http.get<any>('http://localhost:3000/api/users/recorders')
      .pipe(map(data => {
          return data;
      }));
  }

  getRegistrarById(id: string) {
    return this.http.get<any>(`${this.getByIdUrl}` + id)
      .pipe(map(registrar => {
          return registrar.data;
      }));
  }
}
