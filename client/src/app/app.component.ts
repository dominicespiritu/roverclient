import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { RestApiService } from 'app/rest-api.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { Location } from '@angular/common';
import { exists } from 'fs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  title = 'NASA API Based App';
  name = "";
  dateCapture = "";
  errorMessage = "";
  dataResponse: any;
  loading = false;
  file: any;
  constructor(
    private rest: RestApiService,
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient
  ) { 
    this.file = "";
  }

  ngOnInit() {
    console.log(location);
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4
      }
    ];
    this.galleryImages = [];
  }

  onFileChanged(event: any) {
    this.file = event.target.files;
    // console.log(event.target);
  }

   onUpload() {
     try {
      const formData = new FormData();
      for (const file of this.file) {
        console.log(file);
        if(file.type.indexOf('image') == -1){
          console.log('not image');
          
          throw "The file you selected is not an image.";
          
        }
        formData.append('files', file, file.name);
      }
      // console.log(formData.getAll('files')); 
      // formData.append('name', this.file, this.file.name);
      // console.log(formData);
      // this.http.post('http://localhost:3000/api/upload', formData).subscribe(x => {
      //   console.log(x);
      //   console.log('file uploaded...');
      // });
      
      this.http.post('http://localhost:3000/api/upload', formData)
      .subscribe(
        // (r)=>{console.log('got r', r)}
        data => {
          console.log(data); 
          this.errorMessage = data['message'];
        },
        error => {
            console.log(error);
            this.errorMessage = error;
        }
      );
     } catch(err) {
      this.errorMessage = err;
     }
     
  }

  async fetchImage(){
    console.log(location.protocol + '//' + location.hostname + ':' + location.port);
    this.galleryImages = [];
    var d = new Date(this.dateCapture);
    this.loading = true;
    console.log('capture date..' + this.dateCapture); 
    if(isNaN(d.getTime())){
      console.log('invalid date');
      this.errorMessage = "The date you provided is invalid.";
    } else {
      console.log('valid date');
      this.errorMessage = "";
      try{
        this.dataResponse = {};
        const response = await this.rest.post(
          location.protocol + '//' + location.hostname + ':3000' + `/api/rover/capture`,
          { 'date': this.dateCapture }
        );
        this.dataResponse = response;
        if(Array.isArray(this.dataResponse['data']['images'])){
          for(var i=0;i<this.dataResponse['data']['images'].length;i++){
            
            this.galleryImages.push(
              {
                'small': location.protocol + '//' + location.hostname + ':3000' + '/tmp/' + this.dataResponse['data']['folder'] + '/' + this.dataResponse['data']['images'][i],
                'medium': location.protocol + '//' + location.hostname + ':3000' + '/tmp/' + this.dataResponse['data']['folder'] + '/' + this.dataResponse['data']['images'][i],
                'big': location.protocol + '//' + location.hostname + ':3000' + '/tmp/' + this.dataResponse['data']['folder'] + '/' + this.dataResponse['data']['images'][i]
              }
            );
          }
          console.log(this.galleryImages);
        }
        response['success']
        ? (this.dataResponse = response)
        : this.errorMessage = response['message'];
        this.loading = false;
      } catch(error){
        this.errorMessage = error;
      }
    }
  }
  
}
