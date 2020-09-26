import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsModule, GoogleMap } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { BreweryService } from 'src/app/services/brewery.service';
import { Brewery } from 'src/app/models/brewery';


@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements OnInit {
  zoom = 14;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions;
  blist: Brewery[] = [];
  @ViewChild(GoogleMap, {static: false}) map: GoogleMap;
  

  constructor(private bs: BreweryService) { }

  ngOnInit(): void {
    this.blist = this.bs.breweryList;
  }

  initMap() {
    console.log("invoked initMap");
    this.getLatLong();



    console.log(this.center);

    this.map.panTo(this.center);

  }

  async getLatLong() {
    let ret: google.maps.LatLngLiteral;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }
      );
    } else {
      // location turned off
      // use search term to center map
    }
    return ret;
  }

  getMarkers() {
    
  }

}
