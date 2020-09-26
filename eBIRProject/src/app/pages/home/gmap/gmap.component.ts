import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsModule, GoogleMap, MapMarker } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { BreweryService } from 'src/app/services/brewery.service';
import { Brewery } from 'src/app/models/brewery';
import { MapService } from 'src/app/services/map.service';


@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['../home.component.css', './gmap.component.css']
})
export class GmapComponent implements OnInit {
  zoom = 8;
  options: google.maps.MapOptions;
  @ViewChild(GoogleMap, {static: false}) map: GoogleMap;
  markers: google.maps.LatLng[] = [];
  bIcon: google.maps.Icon = { url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"};


  constructor(public bs: BreweryService, public ms: MapService) { }

  ngOnInit(): void {
  }

  initMap() {
    this.ms.setMap(this.map);
    this.markers = this.ms.getMarkers();
    this.ms.setCenter();
  }
}
