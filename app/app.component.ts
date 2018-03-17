import { Component , OnInit } from '@angular/core';
import { GoogleMapDirective } from '../app/directives/google-map.directive';
import { GoogleMapMarkerDirective } from '../app/directives/google-map-marker.directive';

import { MapsService } from '../app/services/maps.service';
import { GeolocationService } from '../app/services/geolocation.service';
import { GeocodingService } from '../app/services/geocoding.service';

var jsts = require('../node_modules/jsts/dist/jsts');
import  '../app/wicket/wicket.js';
import { FormGroup, FormControl } from '@angular/forms';
import {GridOptions} from 'ag-grid/main';
declare var beginsWith, endsWith, root, Wkt;
@Component({
    selector: 'app-component',
    templateUrl: './app/app.component.html',
    styleUrls: ['./app/app.component.scss'] 
})
export class AppComponent implements OnInit {
    
    users = [{
  username: 'aa',
  email: 'aa',
  password: 'aa',
  role: 'aa'
  },
    {
  username: 'bb',
  email: 'bb',
  password: 'bb',
  role: 'bb'
  }];
  cats = [{  
    name: 'aaa',
  weight: 10,
  age: 10},
  {  
    name: 'ddd',
  weight: 20,
  age: 30}];
  cat = [];
  isLoading = true;
  isEditing = false;

  addCatForm: FormGroup;
  name = new FormControl('');
  age = new FormControl('');
  weight = new FormControl('');
    
    
    columnDefs = [
    {headerName: "Longitude", field: "make", editable: true},
    {headerName: "Latitude", field: "model", editable: true},
    {headerName: "Address", field: "price", editable: true},
    {headerName: "Ring radius input",  editable: true},
    {headerName: "Ring radius output", editable: true}
];

 rowData = [];
/*
 gridOptions = {
    columnDefs: this.columnDefs,
    rowData: this.rowData,
    editType: 'fullRow',
    onCellValueChanged: function(event) {
        console.log('onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue);
    },
    onRowValueChanged: function(event) {
        var data = event.data;
        console.log('onRowValueChanged: (' + data.make + ', ' + data.model + ', ' + data.price + ')');
    },
    onGridReady: function(event) {
        event.api.sizeColumnsToFit();
    }
};*/
    
    
   // columnDefs;
   // rowData;
    
    // Center map. Required.
    center: google.maps.LatLng;
    map: google.maps.Map ;
    myOptions : any;
    // MapOptions object specification.

    // The initial map zoom level. Required.
    zoom: number;

    disableDefaultUI: boolean;
    disableDoubleClickZoom: boolean;
    mapTypeId: google.maps.MapTypeId;
    maxZoom: number;
    minZoom: number;
    styles: Array<google.maps.MapTypeStyle>;

    // Marker position. Required.
    position: google.maps.LatLng;

    // Marker title.
    title: string;

    // Info window.
    content: string;

    // Address to be searched.
    address: string;

    // Warning flag & message.
    warning: boolean;
    message: string;
  
    coords = [
    new google.maps.LatLng(37.686172, -122.20929),
    new google.maps.LatLng(37.686172, -121.40929),
    new google.maps.LatLng(36.886172, -121.40929),
    new google.maps.LatLng(36.886172, -122.20929),
    new google.maps.LatLng(37.686172, -122.20929)
  ];

    coords2 = [
    new google.maps.LatLng(37.486172, -121.5),
    new google.maps.LatLng(37.086172, -121.5),
    new google.maps.LatLng(37.086172, -121),
    new google.maps.LatLng(37.486172, -121),
    new google.maps.LatLng(37.486172, -121.00929)
  ];

   polygon1 = new google.maps.Polygon({
    paths: [this.coords],
    strokeColor: '#000000',
    strokeOpacity: 0.8,
    strokeWeight: 1,
    fillColor: '#00FF00',
    fillOpacity: 0.35
  });

   polygon2 = new google.maps.Polygon({
    paths: [this.coords2],
    strokeColor: '#000000',
    strokeOpacity: 0.8,
    strokeWeight: 1,
    fillColor: '#0000FF',
    fillOpacity: 0.35
  });
  

    constructor(public maps: MapsService, private geolocation: GeolocationService, private geocoding: GeocodingService) {
        
/*
        this.rowData = [
            {make: "Toyota", model: "Celica", price: 35000},
            {make: "Ford", model: "Mondeo", price: 32000},
            {make: "Porsche", model: "Boxter", price: 72000}
        ];
  */      
        this.center = new google.maps.LatLng(41.910943, 12.476358);
        this.zoom = 14;

        // Other options.
        this.disableDefaultUI = true;
        this.disableDoubleClickZoom = false;
        this.mapTypeId = google.maps.MapTypeId.ROADMAP;
        this.maxZoom = 18;
        this.minZoom = 12;
        // Styled Maps: https://developers.google.com/maps/documentation/javascript/styling
        // You can use the Styled Maps Wizard: http://googlemaps.github.io/js-samples/styledmaps/wizard/index.html 
        this.styles = [
            {
                featureType: 'landscape',
                stylers: [
                    { color: '#ffffff' }
                ]
            }
        ];

        // Initially the marker isn't set.

        this.address = "";

        this.warning = false;
        this.message = "";
    }

  onCellValueChangedn(event) {
        console.log('onCellValueChanged: ' + event.colDef.field + ' = ' + event.newValue);
    }
    onRowValueChangedn(event) {
        var data = event.data;
        console.log('onRowValueChanged: (' + data.make + ', ' + data.model + ', ' + data.price + ')');
    }
    onGridReadyn(event) {
        event.api.sizeColumnsToFit();
    }
  
   onGridReady(params) {
        params.api.sizeColumnsToFit();
    }

  setMap(lat:number , lng:number){
  
       this.myOptions = {
          zoom: 8,
          center: new google.maps.LatLng(lat, lng),
          mapTypeId: google.maps.MapTypeId.ROADMAP
       };
    
     this.map = new google.maps.Map(document.getElementById('map'),this.myOptions);
  
  }
  
  ngOnInit() {
      
        for (var i = 0; i<10; i++) {
         this.rowData.push({make: "Toyota", model: "Celica", price: 35000 + (i * 1000)});
         this.rowData.push({make: "Ford", model: "Mondeo", price: 32000 + (i * 1000)});
         this.rowData.push({make: "Porsche", model: "Boxter", price: 72000 + (i * 1000)});
    }
    
    /***
    this.NumericCellEditor.prototype.init = function (params) {
    // we only want to highlight this cell if it started the edit, it is possible
    // another cell in this row started teh edit
    this.focusAfterAttached = params.cellStartedEdit;

    // create the cell
    this.eInput = document.createElement('input');
    this.eInput.style.width = '100%';
    this.eInput.style.height = '100%';
    this.eInput.value = this.isCharNumeric(params.charPress) ? params.charPress : params.value;

    var that = this;
       this.eInput.addEventListener('keypress', function (event) {
            if (!this.isKeyPressedNumeric(event)) {
                that.eInput.focus();
            if (event.preventDefault) event.preventDefault();
           }
       });
   };

// gets called once when grid ready to insert the element
   this.NumericCellEditor.prototype.getGui = function () {
    return this.eInput;
   };

// focus and select can be done after the gui is attached
    this.NumericCellEditor.prototype.afterGuiAttached = function () {
        // only focus after attached if this cell started the edit
        if (this.focusAfterAttached) {
            this.eInput.focus();
            this.eInput.select();
        }
    };

    // returns the new value after editing
    this.NumericCellEditor.prototype.isCancelBeforeStart = function () {
        return this.cancelBeforeStart;
    };
    
    // example - will reject the number if it contains the value 007
    // - not very practical, but demonstrates the method.
    this.NumericCellEditor.prototype.isCancelAfterEnd = function () {
    };
    
    // returns the new value after editing
    this.NumericCellEditor.prototype.getValue = function () {
        return this.eInput.value;
    };
    
    // when we tab onto this editor, we want to focus the contents
    this.NumericCellEditor.prototype.focusIn = function () {
        var eInput = this.getGui();
        eInput.focus();
        eInput.select();
        console.log('NumericCellEditor.focusIn()');
    };
    
    // when we tab out of the editor, this gets called
    this.NumericCellEditor.prototype.focusOut = function() {
        // but we don't care, we just want to print it for demo purposes
        console.log('NumericCellEditor.focusOut()');
    };
    
    for (var i = 0; i<10; i++) {
         this.rowData.push({make: "Toyota", model: "Celica", price: 35000 + (i * 1000)});
         this.rowData.push({make: "Ford", model: "Mondeo", price: 32000 + (i * 1000)});
         this.rowData.push({make: "Porsche", model: "Boxter", price: 72000 + (i * 1000)});
    }
  
    document.addEventListener("DOMContentLoaded", function() {
        var eGridDiv = document.querySelector('#myGrid');
        new this.agGrid.Grid(eGridDiv, this.gridOptions);
    });  
    *****/
    
   this.setMap(37.086172, -121);
  /*  
  this.polygon1.setMap(this.map);
  this.polygon2.setMap(this.map);
  
  google.maps.event.addListener(this.polygon2, 'click', this.DoEverything);
  google.maps.event.addListener(this.polygon1, 'click', this.DoEverything);
    */
  //      var wkt = this.UseWicketToGoFromGooglePolysToWKT(this.polygon1, this.polygon2);
  //  this.UseJstsToDissolveGeometries(wkt[0], wkt[1]);
    
    //this.UseJstsToDissolveGeometries(wkt[0], wkt[1]);
/*    
var donut = new google.maps.Polygon({
                 paths: [this.drawCircle(new google.maps.LatLng(37.086172, -121), 1000, 1),
                         this.drawCircle(new google.maps.LatLng(37.086172, -121), 500, -1)],
                 strokeColor: "#0000FF",
                 strokeOpacity: 0.8,
                 strokeWeight: 2,
                 fillColor: "#FF0000",
                 fillOpacity: 0.35
     });*/
    new google.maps.Polygon({
    paths: [
        this.getCirclePoints(new google.maps.LatLng(37.086172, -121), 1000, 100, true),
        this.getCirclePoints(new google.maps.LatLng(37.086172, -121), 500, 100, false)
    ],
                     strokeColor: "#0000FF",
                 strokeOpacity: 0.8,
                 strokeWeight: 2,
                 fillColor: "#FF0000",
                 fillOpacity: 0.35
    
 }).setMap(this.map);
  //   donut.setMap(this.map);    
  }
  
  
    getCats() {
    
   }

  addCat() {
    
  }

  enableEditing(cat) {
    
  }

  cancelEditing() {
    
  }

  editCat(cat) {
   
  }

  deleteCat(cat) {
  }
  
  drawCircle(point, radius, dir) { 
    
    
  var bounds = new google.maps.LatLngBounds();
var d2r = Math.PI / 180;   // degrees to radians 
var r2d = 180 / Math.PI;   // radians to degrees 
var earthsradius = 3963; // 3963 is the radius of the earth in miles

   var points = 360; 

   // find the raidus in lat/lon 
   var rlat = (radius / earthsradius) * r2d; 
   var rlng = rlat / Math.cos(point.lat() * d2r); 


   var extp = new Array(); 
   if (dir==1)  {var start=0;var end=points+1} // one extra here makes sure we connect the
   else     {var start=points+1;var end=0}
   for (var i=start; (dir==1 ? i < end : i > end); i=i+dir)  
   { 
      var theta = Math.PI * (i / (points/2)); 
      var ey = point.lng() + (rlng * Math.cos(theta)); // center a + radius x * cos(theta) 
      var ex = point.lat() + (rlat * Math.sin(theta)); // center b + radius y * sin(theta) 
      extp.push(new google.maps.LatLng(ex, ey)); 
      bounds.extend(extp[extp.length-1]);
   } 
   // alert(extp.length);
   return extp;
   }
    DoEverything() {
    var wkt = this.UseWicketToGoFromGooglePolysToWKT(this.polygon1, this.polygon2);
    this.UseJstsToDissolveGeometries(wkt[0], wkt[1]);
    
    this.UseJstsToDissolveGeometries(wkt[0], wkt[1]);
  }
  
  
   getCirclePoints(center, radius, numPoints, clockwise) {
    var points = [];
    for (var i = 0; i < numPoints; ++i) {
        var angle = i * 360 / numPoints;
        if (!clockwise) {
            angle = 360 - angle;
        }

        // the maps API provides geometrical computations
        // just make sure you load the required library (libraries=geometry)
        var p = google.maps.geometry.spherical.computeOffset(center, radius, angle);
        points.push(p);
    }

    // 'close' the polygon
    points.push(points[0]);
    return points;
}

    getCurrentPosition() {
        this.warning = false;
        this.message = "";

        if (navigator.geolocation) {
            this.geolocation.getCurrentPosition().forEach(
                (position: Position) => {
                    if (this.center.lat() != position.coords.latitude && this.center.lng() != position.coords.longitude) {
                        // New center object: triggers OnChanges.
                        this.center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        this.zoom = 14;
                        // Translates the location into address.
                        this.geocoding.geocode(this.center).forEach(
                            (results: google.maps.GeocoderResult[]) => {
                                this.setMarker(this.center, "your locality", results[0].formatted_address);
                           var myLatLng = {lat: position.coords.latitude,
                                           lng: position.coords.longitude};      
                        var marker = new google.maps.Marker({
                                                      position: myLatLng,
                                                      title: 'Hello World!'
                                                      });
                            this.setMap( position.coords.latitude, position.coords.longitude);
                              
                            marker.setMap(this.map);
                              
                              
                            }
                        ).then(() => console.log('Geocoding service: completed.'));
                    }
                }
            ).then(() => console.log('Geolocation service: completed.')).catch(
                (error: PositionError) => {
                    if (error.code > 0) {
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                this.message = 'permission denied';
                                break;
                            case error.POSITION_UNAVAILABLE:
                                this.message = 'position unavailable';
                                break;
                            case error.TIMEOUT:
                                this.message = 'position timeout';
                                break;
                        }
                        this.warning = true;
                    }
                });
        } else {
            this.message = "browser doesn't support geolocation";
            this.warning = true;
        }
    }

    search(address: string) {
        if (address != "") {
            this.warning = false;
            this.message = "";
            // Converts the address into geographic coordinates.
            this.geocoding.codeAddress(address).forEach(
                (results: google.maps.GeocoderResult[]) => {
                    if (!this.center.equals(results[0].geometry.location)) {
                        // New center object: triggers OnChanges.                       
                        this.center = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                        this.zoom = 14;
                    
                     var myLatLng = {lat: results[0].geometry.location.lat(),
                                     lng: results[0].geometry.location.lng()};
                        //this.setMarker(this.center, "search result", results[0].formatted_address);
                        var marker = new google.maps.Marker({
                                                      position: myLatLng,
                                                      title: 'Hello World!'
                                                      });
                      this.setMap( results[0].geometry.location.lat(), results[0].geometry.location.lng());
                      marker.setMap(this.map);
                    }
                }
            ).then(
                () => {
                    this.address = "";
                    console.log('Geocoding service: completed.');
                }).catch(
                (status: google.maps.GeocoderStatus) => {
                    if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                        this.message = "zero results";
                        this.warning = true;
                    }
                });
        }
    }

    // Sets the marker & the info window.
    setMarker(latLng: google.maps.LatLng, title: string, content: string) {
        this.maps.deleteMarkers();
        // Sets the marker.
        this.position = latLng;
        this.title = title;
        // Sets the info window.
        this.content = content;
    }

  
   UseWicketToGoFromGooglePolysToWKT(poly1, poly2) {
    var wicket = new  Wkt.Wkt();

    wicket.fromObject(poly1);
    var wkt1 = wicket.write();

    wicket.fromObject(poly2);
    var wkt2 = wicket.write();

    return [wkt1, wkt2];
  }

  UseJstsToTestForIntersection(wkt1, wkt2) {
    // Instantiate JSTS WKTReader and get two JSTS geometry objects
    var wktReader = new jsts.io.WKTReader();
    var geom1 = wktReader.read(wkt1);
    var geom2 = wktReader.read(wkt2);

    if (geom2.intersects(geom1)) {
      alert('intersection confirmed!');
    } else {
      alert('..no intersection.');
    }
  }

  UseJstsToDissolveGeometries(wkt1, wkt2) {
    // Instantiate JSTS WKTReader and get two JSTS geometry objects
    var wktReader = new jsts.io.WKTReader();
    var geom1 = wktReader.read(wkt1);
    var geom2 = wktReader.read(wkt2);

    // In JSTS, "union" is synonymous with "dissolve"
    var dissolvedGeometry = geom1.intersection(geom2);

    // Instantiate JSTS WKTWriter and get new geometry's WKT
    var wktWriter = new jsts.io.WKTWriter();
    var wkt = wktWriter.write(dissolvedGeometry);

    // Use Wicket to ingest the new geometry's WKT
    var wicket = new Wkt.Wkt();
    wicket.read(wkt);

    // Assemble your new polygon's options, I used object notation
    var polyOptions = {
      strokeColor: '#1E90FF',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#1E90FF',
      fillOpacity: 0.35
    };

    // Let wicket return a Google Polygon with the options you set above
    var newPoly = wicket.toObject(polyOptions);

  //  this.polygon1.setMap(null);
  //  this.polygon2.setMap(null);

    newPoly.setMap(this.map);
  }





///////////////////////////// david start ///////////////////////////////////////////////
 /* 

 onBtStopEditing() {
  //  this.gridOptions.api.stopEditing();
};

 onBtStartEditing() {
  //  this.gridOptions.api.setFocusedCell(2, 'make');
  //  this.gridOptions.api.startEditingCell({
  //      rowIndex: 2,
  //      colKey: 'make'
  //  });
}

// function to act as a class
 NumericCellEditor() {
}

// gets called once before the renderer is used

 isCharNumeric(charStr) {
    return !!/\d/.test(charStr);
}

 isKeyPressedNumeric(event) {
    var charCode = this.getCharCodeFromEvent(event);
    var charStr = String.fromCharCode(charCode);
    return this.isCharNumeric(charStr);
}

 getCharCodeFromEvent(event) {
    event = event || window.event;
    return (typeof event.which == "undefined") ? event.keyCode : event.which;
}

// wait for the document to be loaded, otherwise
// ag-Grid will not find the div in the document.
  
 */ 
///////////////////////////// david stop ////////////////////////////////////////////////  

  
}


/*

$(document).ready(function() {


    polygon1.setMap(map);
  polygon2.setMap(map);
  
  google.maps.event.addListener(polygon2, 'click', DoEverything);
  google.maps.event.addListener(polygon1, 'click', DoEverything);

});
 * */
