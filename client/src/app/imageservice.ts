import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { of } from "rxjs/observable/of";
@Injectable()
export class ImageService {

    constructor(private http: HttpClient) {}
  
  
    uploadImage(image: File) {
      const formData = new FormData();
  
      formData.append('image', image);
  
      return this.http.post('/api/v1/image-upload', formData);
    }
  }
  