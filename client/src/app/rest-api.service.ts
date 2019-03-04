import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { of } from "rxjs/observable/of";
@Injectable()
export class RestApiService {

  constructor(private http: HttpClient) { }

  getHeaders(){
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', token) : null;
  }

  get(link: string){
    return this.http.get(link, { headers: this.getHeaders() }).toPromise();
  }

  post(link: string, body: any){
    return this.http.post(link, body, { headers: this.getHeaders() }).toPromise();
  }

  upload(link: string, body: any){
    return this.http.post(link, body, { headers: this.getHeaders() });
  }
  
  search(link: string, body: any) {
    // if (term.length < 3) {
    //   return of([]);
    // }
    const url = '/api/images/all';
    return this.http.post(link, body, { headers: this.getHeaders() }).map(res => {
      console.log(res);
      const result = res['data'];
      
      return result;
    });
  }
}
