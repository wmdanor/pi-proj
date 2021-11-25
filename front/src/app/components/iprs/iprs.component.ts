import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Ipr } from 'src/app/models/ipr';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-iprs',
  templateUrl: './iprs.component.html',
  styleUrls: ['./iprs.component.scss']
})
export class IprsComponent implements OnInit {
  
  iprs:Ipr[] = [];
  loading = true;

  constructor(private http: HttpClient, private router: Router,) { }

  ngOnInit(): void {
    this.loading = true;
    this.getAllIprs()
      .subscribe(
        data => {
          this.loading = false;
          this.iprs = data;
        },
        error => {
          this.loading = false;
          console.log(error)
        });
  }


  getAllIprs(){
    return this.http.get<Ipr[]>(`${environment.apiUrl}/api/ipr`)
    .pipe(map(iprs => {
        return iprs;
    }));
  }

  goToIpr(iprId: string | undefined){
    this.router.navigate([`/ipr/${iprId}`]);
  }

}
