import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RestApiService } from './rest-api.service';
import { DataService} from './data.service';
import { HttpClientModule } from '@angular/common/http'

import { NgxGalleryModule } from 'ngx-gallery';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxGalleryModule
    
  ],
  providers: [
    RestApiService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
