import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { RestApiService } from 'app/rest-api.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { Location } from '@angular/common';
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
  constructor(
    private rest: RestApiService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

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

  async fetchImage(){console.log(location.protocol + '//' + location.hostname + ':' + location.port);
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
