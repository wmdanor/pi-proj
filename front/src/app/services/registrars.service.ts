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
  addRegistrarUrl = `${environment.apiUrl.RecordersUrl}`;

  constructor(private http: HttpClient) { }
  
  getRegistrars(q:string, limit: number, offset: number) {
    return this.http.get<any>(this.getRegistrarsUrl, {params: {q:q , limit: limit, offset: offset}})
      .pipe(map(data => {
          return data;
      }));
  }

  getRegistrarsCount(q:string) {
    return this.http.get<any>(`${this.getRegistrarsUrl}/count`, {params: {q:q}})
      .pipe(map(data => {
          return data;
      }));
  }

  getRegistrarById(id: string) {
    return this.http.get<any>(this.getByIdUrl + id)
      .pipe(map(registrar => {
          return registrar.data;
      }));
  }

  addRegistrar(user: User) {    
    return this.http.post<any>(this.addRegistrarUrl, user)
      .pipe(map(registrar => {
          return registrar.data;
      }));
  }

  activateRegistrar(isActive: boolean, id: string){
    console.log({isActive})
    return this.http.put<any>(`${environment.apiUrl.RecordersUrl}/` + id + '/activate', {isActive})
      .pipe(map(data => {
          return data;
      }));
    
  }

}
