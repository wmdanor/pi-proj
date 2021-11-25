import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Ipr } from 'src/app/models/ipr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ipr',
  templateUrl: './ipr.component.html',
  styleUrls: ['./ipr.component.scss']
})
export class IprComponent implements OnInit {
  id: string = '';
  ipr: Ipr = {}
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idFromUrl();
    //this.getIprInfo();
    console.log(this.id);
    console.log(this.ipr);

  }

  getIprInfo(){
    console.log(`${environment.apiUrl}/ipr/${this.id}`);
    return this.http.get<Ipr>(`${environment.apiUrl}/api/ipr/${this.id}`)
      .pipe(map(ipr => {
          this.ipr = ipr;
      }));
  }

  idFromUrl() {
    this.route.params.subscribe( params => this.id = params.id );
    if (this.id === '2'){
      this.ipr = {
        id: '2',
        authorPublicNameType: 'mikelandgelo',
        publicationType: 'Art',
        publicationTitle: 'Madinna doni'
      }
    } else {
      this.ipr = {
        id: '1',
        authorPublicNameType: 'leonardo davinchi',
        publicationType: 'Science',
        publicationTitle: 'Architect'
      }
    }
  }

}
