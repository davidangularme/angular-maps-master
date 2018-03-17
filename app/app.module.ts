import { NgModule , VERSION , CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GoogleMapDirective } from '../app/directives/google-map.directive';
import { GoogleMapMarkerDirective } from '../app/directives/google-map-marker.directive';

import { MapsService } from '../app/services/maps.service';
import { GeolocationService } from '../app/services/geolocation.service';
import { GeocodingService } from '../app/services/geocoding.service';

import { AppComponent } from '../app/app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AgGridModule} from 'ag-grid-angular/main';

// editor
// dynamic component


@NgModule( {
        imports: [
        BrowserModule,
        AgGridModule.withComponents([]),
        CommonModule,
        FormsModule,
        NgbModule,
    ],
    declarations: [
        AppComponent,
        GoogleMapDirective,
        GoogleMapMarkerDirective,
    ],
    providers: [
        MapsService,
        GeolocationService,
        GeocodingService,
    ],
    bootstrap: [AppComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA ],
})
 
export class AppModule { }
