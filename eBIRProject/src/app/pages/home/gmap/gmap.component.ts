import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsModule, GoogleMap } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { BreweryService } from 'src/app/services/brewery.service';
import { Brewery } from 'src/app/models/brewery';
import { MapService } from 'src/app/services/map.service';


@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements OnInit {
  zoom = 14;
  options: google.maps.MapOptions;
  @ViewChild(GoogleMap, {static: false}) map: GoogleMap;
  

  constructor(public bs: BreweryService, public ms: MapService) { }

  ngOnInit(): void {
  }

  initMap() {
    console.log("invoked initMap");

    this.ms.setCenter(this.map);
  }

  getMarkers() {
    
  }

}
