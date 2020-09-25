import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BreweryService } from './brewery.service';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  private myLat: number;
  private myLong: number;
  private brewLoc: object[] = [];

  constructor(private http: HttpClient, private bs: BreweryService) { }

  async generateMap() {
    this.getLatLong();

    console.log(this.getLocations());

  }

  // 2d array, each brewLocations[i] corresponds to ith brewery object
  // should contain an array [lat long]
  getLocations(): object[] {
    let ret = [];

    this.bs.breweryList.forEach(b => {
      let temp = [];
      temp.push(b.latitude);
      temp.push(b.longitude);
      ret.push(temp);
    })

    return ret;
  }

  // get lat and long from user's location
  getLatLong() {
    let myPos;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          this.myLat = position.coords.latitude;
          this.myLong = position.coords.longitude;
        }
      );
    } else {
      // location turned off
      // use search term to center map
    }
  }

}
