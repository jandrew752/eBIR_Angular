import { Injectable } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { BreweryService } from './brewery.service';
import { Brewery } from '../models/brewery';
import { positionElements } from '@ng-bootstrap/ng-bootstrap/util/positioning';

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
          console.log(this.pos);
          m.panTo(this.pos);
          
          m.zoom = 12;
        }
      );
    } else {
      // location turned off
      // use search term to center map
    }

  }

  refreshMap(m: GoogleMap) {
    this.map = m;
    if (!this.pos) {
      this.setCenter(m);
    }
  }

  getMarkers(): google.maps.LatLng[] {
    let ret: google.maps.LatLng[] = [];
    for (let b of this.bs.breweryList) {
      ret.push(new google.maps.LatLng(b.latitude, b.longitude));
    }
    return ret;
  }

}
