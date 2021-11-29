import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Ipr } from '../models/ipr';

@Injectable({
  providedIn: 'root'
})
export class IprService {

  getIprsUrl = `${environment.apiUrl}/ipr`;
  getIprByIdUrl = `${environment.apiUrl}/ipr/`;

  constructor(private http: HttpClient) { }

  getIprs() {
    return this.http.get<Ipr[]>(this.getIprsUrl)
      .pipe(map(iprs => {
          return iprs;
      }));
    
  }

  getIprbyId(id: string) {
    return this.http.get<Ipr>(this.getIprByIdUrl + id)
      .pipe(map(ipr => {
          return ipr;
      }));
  }
}
