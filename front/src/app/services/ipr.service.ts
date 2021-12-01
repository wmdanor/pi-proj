import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Ipr } from '../models/ipr';

export interface  filter {
  publicationTitle: string;
  authorName: string;
  copyrightRegistrationNumber:string;
  publicationObjectTypeId:string;
}

@Injectable({
  providedIn: 'root'
})
export class IprService {
  getIprsUrl = `${environment.apiUrl.IprsUrl}/filter`;
  getIprByIdUrl = `${environment.apiUrl.IprsUrl}/`;
  getIprsCountURL = `${environment.apiUrl.IprsUrl}/count`

  constructor(private http: HttpClient) { }

  getIprs(data: filter, limit: number, offset: number) {
    return this.http.get<any>(this.getIprsUrl,  {params: {publicationTitle: data.publicationTitle, authorName: data.authorName,  copyrightRegistrationNumber:data.copyrightRegistrationNumber,publicationObjectTypeId:data.publicationObjectTypeId, limit: limit, offset: offset}})
      .pipe(map(data => {
          return data;
      }));
    
  }

  getIprbyId(id: string) {
    return this.http.get<any>(this.getIprByIdUrl + id)
      .pipe(map(ipr => {
          return ipr;
      }));
  }

  getIprsCount(q:string) {
    return this.http.get<any>(this.getIprsCountURL, {params: {q:q}})
      .pipe(map(data => {
          return data;
      }));
  }

  addIpr(ipr: Ipr) {    
    return this.http.post<any>(environment.apiUrl.IprsUrl, ipr)
      .pipe(map(registrar => {
          return registrar.data;
      }));
  }

  getoObjectTypes() {
    return this.http.get<any>('http://localhost:3000/api/ipr/object-types')
    .pipe(map(data => {
        return data.data;
    }));  }

    editIpr(ipr: Ipr, id: string) {    
      return this.http.put<any>(`${environment.apiUrl.IprsUrl}/`+id, ipr)
        .pipe(map(registrar => {
            return registrar.data;
        }));
    }
}
