import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrarsService {

getRegistrarsUrl = `${environment.apiUrl}/registrar?`; 
getByIdUrl = `${environment.apiUrl}/registrar/`;

constructor(private http: HttpClient) { }
  getRegistrars(limit: number, offset: number) {
    return this.http.get<User[]>(`${this.getRegistrarsUrl}limit=${limit}&offset=${offset}`)
      .pipe(map(retistrars => {
          return retistrars;
      }));
  }

  getRegistrarById(id: string) {
    return this.http.get<User>(`${this.getByIdUrl}` + id)
      .pipe(map(registrar => {
          return registrar;
      }));
  }
}
