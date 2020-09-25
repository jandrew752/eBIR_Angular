import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BreweryService } from './brewery.service';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  public myLat: number;
  public myLong: number;
  public brewLoc: object[] = [];

  constructor(private http: HttpClient, private bs: BreweryService) { }
  
  // 2d array, each brewLocations[i] corresponds to ith brewery object
  // should contain an array [id lat long]
  getMarkers(): object[] {
    let ret = [];
    console.log(this.bs.breweryList);
    this.bs.breweryList.forEach(b => {
      let temp = [];
      temp.push(b.name);
      temp.push(b.latitude);
      temp.push(b.longitude);
      ret.push(temp);
    })

    console.log(ret);
    return ret;
  }

  // get lat and long from user's location
  getLatLong() {
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
