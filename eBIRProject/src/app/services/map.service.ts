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

  constructor(private bs: BreweryService) {}

  setMap(m: GoogleMap) {
    this.map = m;
  }

  setCenter() {
    console.log("setCenter");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          this.pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          this.map.panTo(this.pos);
          this.map.zoom = 9;
        }
      );
    } else {
      // location turned off
      // use search term to center map
    }
  }

  getMarkers(): google.maps.LatLng[] {
    let ret: google.maps.LatLng[] = [];
    for (let b of this.bs.breweryList) {
      if (b.latitude != null && b.longitude != null) {
        ret.push(new google.maps.LatLng(b.latitude, b.longitude));
      }
    }
    return ret;
  }
}
