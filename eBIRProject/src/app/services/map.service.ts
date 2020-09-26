import { Injectable } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { BreweryService } from './brewery.service';
import { Brewery } from '../models/brewery';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  pos: google.maps.LatLngLiteral;
  map: GoogleMap;

  constructor(private bs: BreweryService) { }

  setCenter(m: GoogleMap) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          this.pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }
      );
    } else {
      // location turned off
      // use search term to center map
    }

    m.panTo(this.pos);
    m.zoom = 8;
  }

  setMarkers() {

    for (let b of this.bs.breweryList) {
      
    }

  }

  refreshMap() {

    if (!this.pos) {
      this.setCenter(this.map);
    }

    this.setMarkers();

    this.map.panTo(this.pos);
  }
}
